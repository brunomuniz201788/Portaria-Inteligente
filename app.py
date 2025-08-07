from flask import Flask, render_template

# Cria uma instância da aplicação Flask
app = Flask(__name__)

# Configura o controle de cache para arquivos estáticos (OPCIONAL, mas recomendado)
@app.after_request
def add_header(response):
    response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, max-age=0'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '0'
    return response

# Define a rota principal da sua aplicação
@app.route('/')
def index():
    # Renderiza o arquivo index.html que está na pasta templates
    return render_template('index.html')

# Permite que a aplicação seja executada diretamente
if __name__ == '__main__':
    # Roda o servidor em modo de depuração (debug=True)
    # Isso permite que as alterações no código sejam recarregadas automaticamente
    app.run(debug=True)