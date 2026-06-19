import socket
import http.server
import socketserver
import os
import sys

# Garante que o console do Windows lide com UTF-8 se necessário, ou evita caracteres problemáticos
try:
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8')
except Exception:
    pass

PORT = 8000
DIRECTORY = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'docs')

def get_local_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(('8.8.8.8', 80))
        IP = s.getsockname()[0]
    except Exception:
        IP = '127.0.0.1'
    finally:
        s.close()
    return IP

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def main():
    local_ip = get_local_ip()
    print("=" * 60)
    print("      APLICATIVO APENAS CORRER - INICIADO")
    print("=" * 60)
    print(f"\n1. No seu COMPUTADOR, acesse:\n   [+] http://localhost:{PORT}\n")
    print(f"2. No seu CELULAR (conectado no mesmo Wi-Fi), acesse:\n   [+] http://{local_ip}:{PORT}\n")
    print("3. Como instalar no celular:")
    print("   - No Android (Chrome): clique nos tres pontinhos e selecione 'Adicionar a tela inicial'.")
    print("   - No iPhone (Safari): clique no botao de Compartilhar e selecione 'Adicionar a Tela de Inicio'.")
    print("-" * 60)
    print("Pressione Ctrl + C no terminal do seu computador para fechar o servidor.")
    print("=" * 60 + "\n")

    handler = MyHTTPRequestHandler
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), handler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServidor finalizado. Bons treinos!")

if __name__ == "__main__":
    main()
