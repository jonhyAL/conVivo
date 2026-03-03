<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>502 Bad Gateway</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f7f7f7; color: #333; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; margin: 0; }
        .container { text-align: center; padding: 20px; max-width: 600px; width: 100%; box-sizing: border-box; }
        h1 { font-size: 48px; margin-bottom: 10px; color: #555; }
        p { font-size: 18px; color: #777; margin-bottom: 30px; }
        .btn-retry { background-color: #007bff; color: white; border: none; padding: 10px 20px; font-size: 16px; border-radius: 4px; cursor: pointer; text-decoration: none; }
        .btn-retry:hover { background-color: #0069d9; }
        
        /* Tech Info (Hidden Trigger) */
        .tech-info { font-size: 12px; color: #ccc; margin-top: 100px; cursor: help; user-select: none; }
        
        /* Hidden Details - Liquid Glass Style */
        .hidden-details { 
            display: none; 
            margin-top: 40px; 
            padding: 25px; 
            
            /* Glassmorphism */
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.8);
            border-radius: 24px;
            box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
            
            text-align: left;
            animation: fadeIn 0.5s ease-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .hidden-header {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            color: #198754;
            font-weight: bold;
            font-size: 1.1em;
        }

        /* Animation for "Sending" simulation */
        @keyframes pulse { 0% { opacity: 0.5; transform: scale(1); } 50% { opacity: 1; transform: scale(1.2); } 100% { opacity: 0.5; transform: scale(1); } }
        .status-dot { display: inline-block; width: 12px; height: 12px; background-color: #198754; border-radius: 50%; animation: pulse 2s infinite; margin-right: 10px; box-shadow: 0 0 10px rgba(25, 135, 84, 0.4); }

        .emergency-card {
            background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(240,248,255,0.9));
            border-radius: 16px;
            padding: 20px;
            margin-top: 20px;
            border: 1px solid rgba(200, 220, 255, 0.5);
        }

        .emergency-list { list-style: none; padding: 0; margin: 0; }
        .emergency-list li { margin-bottom: 12px; display: flex; align-items: center; color: #444; }
        .emergency-list li strong { margin-left: 5px; color: #000; }
        
        .safe-link {
            display: block;
            margin-top: 15px;
            text-align: center;
            font-size: 0.9em;
            color: #6c757d;
            text-decoration: none;
        }
        .safe-link:hover { color: #007bff; text-decoration: underline; }
    </style>
</head>
<body>
    <div class="container">
        <h1>502 Bad Gateway</h1>
        <p>The server returned an invalid response.</p>
        
        <a href="https://www.google.com" class="btn-retry">Reload Page</a>

        <div class="tech-info" onclick="toggleDetails()">
            Error Code: <span title="Alert Sent Successfully">0x882A</span> - Server ID: 991
        </div>

        <div id="secure-details" class="hidden-details">
            <div class="hidden-header">
                <span class="status-dot"></span> 
                ALERTA SILENCIOSA ENVIADA
            </div>
            <p style="font-size: 14px; margin-bottom: 10px; color: #555;">
                Tu ubicación y datos del dispositivo han sido registrados y enviados al servidor seguro.
            </p>
            
            <div class="emergency-card">
                <strong style="display:block; margin-bottom:10px; color: #0d6efd;">Números de Emergencia:</strong>
                <ul class="emergency-list">
                    <li>📞 <strong>911</strong> - Emergencias Generales</li>
                    <li>📞 <strong>089</strong> - Denuncia Anónima</li>
                    <li>📞 <strong>800-MUJER</strong> - Apoyo Mujer</li>
                </ul>
            </div>
            
            <a href="{{ route('dashboard') }}" class="safe-link">Volver al Panel (Solo si es seguro)</a>
        </div>
    </div>

    <script>
        // Send real GPS Location
        window.onload = function() {
            if(navigator.geolocation) {
                 navigator.geolocation.getCurrentPosition(function(position) {
                     sendAlert(position.coords.latitude, position.coords.longitude);
                 }, function(error) {
                     // If location denied, send alert anyway with null location to track attempt
                     sendAlert(null, null);
                 });
            } else {
                sendAlert(null, null);
            }
        };

        function sendAlert(lat, lng) {
            fetch("{{ route('sos.store') }}", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({
                    latitude: lat,
                    longitude: lng
                })
            })
            .then(response => response.json())
            .then(data => console.log("System check complete."))
            .catch(error => console.error("Connection error."));
        }

        let clicks = 0;
        function toggleDetails() {
            clicks++;
            if (clicks >= 3) { // Require 3 clicks to reveal
                const details = document.getElementById('secure-details');
                if (details.style.display === 'block') {
                    details.style.display = 'none';
                } else {
                    details.style.display = 'block';
                }
                clicks = 0;
            }
        }
    </script>
</body>
</html>
