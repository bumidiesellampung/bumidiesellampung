import http.server
import socketserver
import os
import sys

PORT = 8088

class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Extract base path and query parameters
        parts = self.path.split('?', 1)
        base_path = parts[0]
        query = ('?' + parts[1]) if len(parts) > 1 else ''
        
        file_path = self.translate_path(base_path)
        
        # If the file does not exist directly, check if file.html exists
        if not os.path.exists(file_path) and os.path.exists(file_path + '.html'):
            self.path = base_path + '.html' + query
            
        return super().do_GET()

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else PORT
    with socketserver.TCPServer(("", port), CleanURLHandler) as httpd:
        print(f"Server running with Clean URLs at http://localhost:{port}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            pass
