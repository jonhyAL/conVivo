<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    <title>Mi Panel - ArcaneCode</title>
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>
<body class="bg-gray-50 min-h-screen font-sans text-slate-600">
    <div id="user-dashboard-root"></div>

    <script>
        window.userData = {
            user: @json($user),
            moodData: @json($moodData),
            hasMoodToday: @json($hasMoodToday),
            appointments: @json($appointments),
            reports: @json($reports),
            courses: @json($courses)
        };
    </script>
</body>
</html>
