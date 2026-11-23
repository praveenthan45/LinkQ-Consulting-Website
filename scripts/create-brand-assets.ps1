# Recreate the supplied wordmark composition as portable vector outlines.
# Run on Windows; Arial is used only to author paths, with no font dependency in the SVGs.
Add-Type -AssemblyName System.Drawing
$brandRoot = Split-Path -Parent $PSScriptRoot
$brandDirectory = Join-Path $brandRoot 'public/brand'
New-Item -ItemType Directory -Path $brandDirectory -Force | Out-Null
$brandCulture = [System.Globalization.CultureInfo]::InvariantCulture
$brandFamily = [System.Drawing.FontFamily]::new('Arial')

function ConvertTo-BrandPath($brandPath) {
    $brandPoints = $brandPath.PathPoints
    $brandTypes = $brandPath.PathTypes
    $brandCommands = [System.Collections.Generic.List[string]]::new()
    for ($brandIndex = 0; $brandIndex -lt $brandPoints.Length; $brandIndex++) {
        $brandPoint = $brandPoints[$brandIndex]
        $brandPair = $brandPoint.X.ToString('0.##', $brandCulture) + ' ' + $brandPoint.Y.ToString('0.##', $brandCulture)
        switch ($brandTypes[$brandIndex] -band 7) {
            0 { $brandCommands.Add('M' + $brandPair) }
            1 { $brandCommands.Add('L' + $brandPair) }
            3 {
                $brandCommands.Add('C' + $brandPair)
                for ($brandCurve = 0; $brandCurve -lt 2; $brandCurve++) {
                    $brandIndex++
                    $brandPoint = $brandPoints[$brandIndex]
                    $brandCommands.Add($brandPoint.X.ToString('0.##', $brandCulture) + ' ' + $brandPoint.Y.ToString('0.##', $brandCulture))
                }
            }
        }
        if ($brandTypes[$brandIndex] -band 128) { $brandCommands.Add('Z') }
    }
    return $brandCommands -join ' '
}

function Get-BrandWord($brandText, $brandStyle, $brandWidth, $brandX, $brandBaseline) {
    $brandPath = [System.Drawing.Drawing2D.GraphicsPath]::new()
    $brandPath.AddString($brandText, $brandFamily, [int]$brandStyle, 160, [System.Drawing.PointF]::new(0, 0), [System.Drawing.StringFormat]::GenericTypographic)
    $brandBounds = $brandPath.GetBounds()
    $brandScale = $brandWidth / $brandBounds.Width
    $brandAscent = 160 * $brandFamily.GetCellAscent($brandStyle) / $brandFamily.GetEmHeight($brandStyle)
    $brandMatrix = [System.Drawing.Drawing2D.Matrix]::new($brandScale, 0, 0, $brandScale, ($brandX - $brandBounds.X * $brandScale), ($brandBaseline - $brandAscent * $brandScale))
    $brandPath.Transform($brandMatrix)
    $brandResult = ConvertTo-BrandPath $brandPath
    $brandPath.Dispose()
    $brandMatrix.Dispose()
    return $brandResult
}

$brandItalic = [System.Drawing.FontStyle]([int][System.Drawing.FontStyle]::Bold -bor [int][System.Drawing.FontStyle]::Italic)
$brandLink = Get-BrandWord ('L' + [char]0x0131 + 'nkq') $brandItalic 355 12 174
# Draw only Gl and bal. No o glyph or outline exists behind the globe.
$brandGlobalPrefix = Get-BrandWord 'Gl' ([System.Drawing.FontStyle]::Bold) 122.3 385 174
$brandGlobalSuffix = Get-BrandWord 'bal' ([System.Drawing.FontStyle]::Bold) 170.7 597.3 174
$brandCaptionPath = [System.Drawing.Drawing2D.GraphicsPath]::new()
$brandCaptionX = 0
foreach ($brandLetter in 'CONSULTING'.ToCharArray()) {
    $brandLetterPath = [System.Drawing.Drawing2D.GraphicsPath]::new()
    $brandLetterPath.AddString([string]$brandLetter, $brandFamily, [int][System.Drawing.FontStyle]::Regular, 32, [System.Drawing.PointF]::new($brandCaptionX, 0), [System.Drawing.StringFormat]::GenericTypographic)
    $brandLetterBounds = $brandLetterPath.GetBounds()
    $brandCaptionX = $brandLetterBounds.Right + 14
    $brandCaptionPath.AddPath($brandLetterPath, $false)
    $brandLetterPath.Dispose()
}
$brandCaptionBounds = $brandCaptionPath.GetBounds()
$brandCaptionScale = 295 / $brandCaptionBounds.Width
$brandCaptionAscent = 32 * $brandFamily.GetCellAscent([System.Drawing.FontStyle]::Regular) / $brandFamily.GetEmHeight([System.Drawing.FontStyle]::Regular)
$brandCaptionMatrix = [System.Drawing.Drawing2D.Matrix]::new($brandCaptionScale, 0, 0, $brandCaptionScale, (425 - $brandCaptionBounds.X * $brandCaptionScale), (211 - $brandCaptionAscent * $brandCaptionScale))
$brandCaptionPath.Transform($brandCaptionMatrix)
$brandCaption = ConvertTo-BrandPath $brandCaptionPath
$brandCaptionPath.Dispose()
$brandCaptionMatrix.Dispose()

foreach ($brandVariant in @('default', 'light')) {
    if ($brandVariant -eq 'light') {
        $brandInk = '#ffffff'; $brandSecondary = '#f3ebe2'; $brandAccent = '#edbd9c'; $brandStart = '#f2cdb1'; $brandEnd = '#c5805a'
        $brandFile = 'linkqglobal-wordmark-light.svg'
    } else {
        $brandInk = '#38271f'; $brandSecondary = '#654b3d'; $brandAccent = '#a74624'; $brandStart = '#c67b45'; $brandEnd = '#873a23'
        $brandFile = 'linkqglobal-wordmark.svg'
    }
    $brandSvg = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 245" role="img" aria-labelledby="brand-title">
  <title id="brand-title">LinkqGlobal Consulting</title>
  <defs><linearGradient id="brand-orbit" x1="0" y1="0" x2="1" y2="0"><stop stop-color="$brandStart"/><stop offset="1" stop-color="$brandEnd"/></linearGradient></defs>
  <path d="M150 75C280-27 436-4 359 116C393 29 310 7 150 75Z" fill="url(#brand-orbit)"/>
  <path d="M88 178C75 231 204 238 330 190C228 255 61 261 88 178Z" fill="url(#brand-orbit)"/>
  <path d="$brandLink" fill="$brandInk"/>
  <path d="M111 69L133 65L129 87L107 94Z" fill="$brandAccent"/>
  <path id="global-prefix" d="$brandGlobalPrefix" fill="$brandSecondary"/>
  <path id="global-suffix" d="$brandGlobalSuffix" fill="$brandSecondary"/>
  <path d="$brandCaption" fill="$brandInk"/>
  <path d="M385 200H411M735 200H768" fill="none" stroke="$brandSecondary" stroke-width="2"/>
</svg>
"@
    [System.IO.File]::WriteAllText((Join-Path $brandDirectory $brandFile), $brandSvg, [System.Text.UTF8Encoding]::new($false))
}
$brandMonogram = Get-BrandWord 'q' $brandItalic 25 12 33
$brandFavicon = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
  <title>LinkqGlobal Consulting</title>
  <rect width="48" height="48" rx="8" fill="#fbf7f1"/>
  <path d="M7 14C29-1 50 4 36 18C39 7 23 6 7 14ZM7 29C5 34 20 39 44 34C28 47 1 44 7 29Z" fill="#a74624"/>
  <path d="$brandMonogram" fill="#38271f"/>
</svg>
"@
[System.IO.File]::WriteAllText((Join-Path $brandRoot 'public/favicon.svg'), $brandFavicon, [System.Text.UTF8Encoding]::new($false))
$brandFamily.Dispose()
Write-Output 'Created the standard and light LinkqGlobal Consulting SVG wordmarks.'
