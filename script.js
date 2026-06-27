let perfil = { score: 0 };

// ============================
// NAVEGAÇÃO
// ============================
function entrar(){
let email = document.getElementById("email").value;

if(email){
document.getElementById("msg").innerText = "Login realizado!";
ir("dashboard");
}
}

function ir(tela){
let telas = document.querySelectorAll(".screen");
telas.forEach(t => t.classList.remove("active"));
document.getElementById(tela).classList.add("active");
}

// ============================
// TESTES (DISC + BIG FIVE + EMPREENDEDOR)
// ============================
let perguntas = [
"Lidero bem pessoas", // DISC
"Consigo convencer pessoas", // DISC
"Sou disciplinado", // DISC
"Gosto de planejar", // BIG FIVE
"Sou organizado", // BIG FIVE
"Me adapto facilmente", // BIG FIVE
"Assumo riscos", // EMPREENDEDOR
"Vejo oportunidades de negócio", // EMPREENDEDOR
"Consigo vender ideias", // EMPREENDEDOR
"Consigo persistir até dar certo" // EMPREENDEDOR
];

function montarTeste(){
let html = "";

for(let i=0;i<perguntas.length;i++){
html += `
<p>${perguntas[i]}</p>
<input type="number" min="1" max="5" id="p${i}">
`;
}

document.getElementById("quiz").innerHTML = html;
}

montarTeste();

function resultadoTeste(){

let total = 0;

for(let i=0;i<perguntas.length;i++){
total += Number(document.getElementById("p"+i).value || 0);
}

let nivel = "";

if(total <= 25){
nivel = "Iniciante";
}
else if(total <= 35){
nivel = "Intermediário";
}
else{
nivel = "Avançado";
}

perfil = {nivel, total};

localStorage.setItem("perfil", JSON.stringify(perfil));

document.getElementById("resTeste").style.display="block";
document.getElementById("resTeste").innerHTML =
"Perfil: "+nivel+" | Score: "+total;

renderDash();
}

// ============================
// EMPRESA
// ============================
function salvarEmpresa(){

let empresa = document.getElementById("empresa").value;
let nicho = document.getElementById("nicho").value;
let problema = document.getElementById("problema").value;

let p = JSON.parse(localStorage.getItem("perfil")) || {nivel:"Iniciante"};

let estrategia = "";

if(p.nivel=="Iniciante"){
estrategia="Validar ideia com clientes reais antes de investir.";
}
else if(p.nivel=="Intermediário"){
estrategia="Criar presença digital e começar marketing.";
}
else{
estrategia="Escalar com anúncios e automação de vendas.";
}

let data = {empresa,nicho,problema,estrategia};

localStorage.setItem("empresa", JSON.stringify(data));

document.getElementById("resEmpresa").style.display="block";
document.getElementById("resEmpresa").innerHTML =
"Empresa: "+empresa+"<br>"+estrategia;

renderDash();
}

// ============================
// IA MELHORADA (NÃO REPETITIVA)
// ============================
function ia(){

let q = document.getElementById("pergunta").value.toLowerCase();

let respostas = [
"Analise seu mercado e valide sua ideia antes de escalar.",
"Foque em resolver um problema real com clareza.",
"Empresas crescem com execução e consistência.",
"Marketing e vendas são mais importantes que a ideia.",
"Teste antes de investir pesado."
];

let r = "";

if(q.includes("vender")){
r = "Para vender mais, você precisa de oferta clara e confiança do cliente.";
}
else if(q.includes("empresa")){
r = "Toda empresa nasce de um problema real do mercado.";
}
else if(q.includes("dinheiro")){
r = "Dinheiro é consequência de valor entregue.";
}
else if(q.includes("crescer")){
r = "Crescimento depende de execução constante.";
}
else{
r = respostas[Math.floor(Math.random()*respostas.length)];
}

document.getElementById("iaRes").style.display="block";
document.getElementById("iaRes").innerHTML = r;
}

// ============================
// DASHBOARD
// ============================
function renderDash(){

let p = JSON.parse(localStorage.getItem("perfil"));
let e = JSON.parse(localStorage.getItem("empresa"));

let html = "";

if(p){
html += "<p><b>Perfil:</b> "+p.nivel+"</p>";
html += "<p><b>Score:</b> "+p.total+"</p>";
}

if(e){
html += "<p><b>Empresa:</b> "+e.empresa+"</p>";
html += "<p><b>Estratégia:</b> "+e.estrategia+"</p>";
}

document.getElementById("dash").innerHTML =
html || "Nenhum dado ainda.";
}

renderDash();
