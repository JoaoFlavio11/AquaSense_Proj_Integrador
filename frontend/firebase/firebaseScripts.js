// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "", // seus dados do firebase
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// autenticar usuário 
document.getElementById('login-btn').onclick = function() {
    if (!this.disabled) {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Mostrar carregamento
        document.getElementById('loading').style.display = 'flex';

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Login bem-sucedido
                window.location.href = 'http://localhost:3000/paginaInicial';
            })
            .catch((error) => {
                // Tratar erros de login
                console.error('Error code:', error.code);
                console.error('Error message:', error.message);
                alert(getErrorMessage(error));
                document.getElementById('loading').style.display = 'none';
            });
    }
};

function getErrorMessage(error){
    switch(error.code){
        case 'auth/invalid-email':
            return 'E-mail inválido';
        case 'auth/wrong-password':
            return 'Senha incorreta';
        case 'auth/missing-password':
            return 'Campo de senha vazio';
        case 'auth/missing-email':
            return 'Campo de email vazio';
        case 'auth/user-not-found':
            return 'Usuário não encontrado';
        case 'auth/user-disabled':
            return 'Usuário desabilitado';
        case 'auth/invalid-credential':
            return 'Credenciais inválidas';
        case 'auth/operation-not-allowed':
            return 'Operação não permitida';
        case 'auth/email-already-in-use':
            return 'este E-mail já está em uso';
        case 'auth/invalid-verification-code':
            return 'Código de verificação inválido';
        case 'auth/expired-action-code':
            return 'Código de verificação expirado';
        default:
            return 'Erro desconhecido';
    }
}

// Recuperar senha
document.getElementById('recover-password-btn').onclick = function() {
    const email = document.getElementById('email').value;

    // Mostrar carregamento
    document.getElementById('loading').style.display = 'flex';

    sendPasswordResetEmail(auth, email)
        .then(() => {
            document.getElementById('loading').style.display = 'none';
            alert('Email enviado com sucesso!');
        })
        .catch((error) => {
            console.error('Error code:', error.code);
            console.error('Error message:', error.message);
            alert(getErrorMessage(error));
            document.getElementById('loading').style.display = 'none';
        });
}




