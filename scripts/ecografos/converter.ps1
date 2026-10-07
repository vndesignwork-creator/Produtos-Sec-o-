# Chamado pelo imagens.mjs: converte e redimensiona as imagens descarregadas.
#
# Recebe um JSON com [{ origem, destino, max, fundo }], onde destino não tem extensão. Uma
# imagem opaca grava-se em JPEG de qualidade 85. Uma com transparência também, aplanada sobre
# a cor fundo (a da caixa onde aparece, que é o que se via através dela); sem cor conhecida,
# fica em PNG. Se for mais larga do
# que max, é reduzida mantendo a proporção. Escreve na última linha um JSON com a extensão
# escolhida para cada tarefa, pela mesma ordem.

param([string]$lista)
Add-Type -AssemblyName System.Drawing

$tarefas = Get-Content -Raw -Encoding UTF8 $lista | ConvertFrom-Json
$jpeg = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$qualidade = New-Object System.Drawing.Imaging.EncoderParameters 1
$qualidade.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), ([long]85)

# Transparência: só conta se o formato tiver canal alfa e houver de facto píxeis
# translúcidos (muitos PNG da Samsung têm canal alfa todo opaco). Amostra uma grelha 60×60.
function Tem-Transparencia($img) {
	if (-not [System.Drawing.Image]::IsAlphaPixelFormat($img.PixelFormat)) { return $false }
	$passoX = [math]::Max(1, [int]($img.Width / 60)); $passoY = [math]::Max(1, [int]($img.Height / 60))
	for ($y = 0; $y -lt $img.Height; $y += $passoY) {
		for ($x = 0; $x -lt $img.Width; $x += $passoX) {
			if ($img.GetPixel($x, $y).A -lt 250) { return $true }
		}
	}
	return $false
}

$extensoes = @()
foreach ($t in $tarefas) {
	try { $orig = New-Object System.Drawing.Bitmap $t.origem }
	catch { throw "Não consegui abrir $($t.url) ($($t.origem)): $($_.Exception.Message)" }
	$alfa = (Tem-Transparencia $orig) -and -not $t.fundo
	$escala = [math]::Min(1.0, [double]$t.max / $orig.Width)
	$w = [int][math]::Round($orig.Width * $escala); $h = [int][math]::Round($orig.Height * $escala)
	$formato = if ($alfa) { [System.Drawing.Imaging.PixelFormat]::Format32bppArgb } else { [System.Drawing.Imaging.PixelFormat]::Format24bppRgb }
	$novo = New-Object System.Drawing.Bitmap $w, $h, $formato
	$g = [System.Drawing.Graphics]::FromImage($novo)
	$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
	$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
	$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
	if (-not $alfa) { $g.Clear($(if ($t.fundo) { [System.Drawing.ColorTranslator]::FromHtml($t.fundo) } else { [System.Drawing.Color]::White })) }
	$atributos = New-Object System.Drawing.Imaging.ImageAttributes
	$atributos.SetWrapMode([System.Drawing.Drawing2D.WrapMode]::TileFlipXY)
	$g.DrawImage($orig, (New-Object System.Drawing.Rectangle 0, 0, $w, $h), 0, 0, $orig.Width, $orig.Height, [System.Drawing.GraphicsUnit]::Pixel, $atributos)
	$g.Dispose(); $orig.Dispose()
	if ($alfa) { $ext = '.png'; $novo.Save($t.destino + $ext, [System.Drawing.Imaging.ImageFormat]::Png) }
	else { $ext = '.jpg'; $novo.Save($t.destino + $ext, $jpeg, $qualidade) }
	$novo.Dispose()
	$extensoes += $ext
}
ConvertTo-Json -Compress -InputObject @($extensoes)
