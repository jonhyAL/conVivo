<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recursos - conVivo</title>
    <script>if(localStorage.panelTheme==='dark'){document.documentElement.classList.add('dark');}</script>
    <link rel="icon" href="{{ asset('images/logos/logo-unico.png') }}" type="image/png">
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>
<body class="bg-slate-950">
    <div id="user-resources-root"
         data-user="{{ json_encode(auth()->user()) }}"
         data-recursos="{{ json_encode($recursos ?? []) }}"
         data-protocolos="{{ json_encode($protocolos ?? []) }}"
    ></div>
</body>
</html>








