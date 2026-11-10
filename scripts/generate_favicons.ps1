Add-Type -AssemblyName System.Drawing

$projectDir = (Get-Location).Path
$srcPath = Join-Path $projectDir "public\brand\evocopilot-emblem.png"
$srcImg = [System.Drawing.Image]::FromFile($srcPath)

function Resize-Png($img, $width, $height, $outFileName) {
    $outPath = Join-Path $projectDir ("public\" + $outFileName)
    $bmp = New-Object System.Drawing.Bitmap($width, $height)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.Clear([System.Drawing.Color]::Transparent)
    $g.DrawImage($img, 0, 0, $width, $height)
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
    Write-Output "Created: $outFileName ($width x $height)"
}

# Google Search specifically prefers multiples of 48px square
Resize-Png $srcImg 48 48 "favicon-48x48.png"
Resize-Png $srcImg 96 96 "favicon-96x96.png"
Resize-Png $srcImg 144 144 "favicon-144x144.png"
Resize-Png $srcImg 192 192 "favicon-192x192.png"
Resize-Png $srcImg 384 384 "favicon-384x384.png"
Resize-Png $srcImg 180 180 "apple-touch-icon.png"
Resize-Png $srcImg 48 48 "favicon.png"

# Generate standard ICO file using 48x48 bitmap
$icoPath = Join-Path $projectDir "public\favicon.ico"
$icoBmp = New-Object System.Drawing.Bitmap(48, 48)
$icoG = [System.Drawing.Graphics]::FromImage($icoBmp)
$icoG.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$icoG.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$icoG.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$icoG.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
$icoG.Clear([System.Drawing.Color]::Transparent)
$icoG.DrawImage($srcImg, 0, 0, 48, 48)
$hIcon = $icoBmp.GetHicon()
$icon = [System.Drawing.Icon]::FromHandle($hIcon)
$fileStream = New-Object System.IO.FileStream($icoPath, [System.IO.FileMode]::Create)
$icon.Save($fileStream)
$fileStream.Close()
$icon.Dispose()
$icoG.Dispose()
$icoBmp.Dispose()
Write-Output "Created: favicon.ico (48x48 icon)"

$srcImg.Dispose()
Write-Output "All Google Search & browser favicon assets generated successfully!"

