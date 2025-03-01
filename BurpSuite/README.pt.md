# Burp Suite - Integração com Gbrlink

**[Read this in English](README.md) | [Lea esto en Español](README.es.md)**

Esta extensão permite integrar o **Gbrlink** diretamente no **Burp Suite**, facilitando a análise automatizada de links quebrados durante seus testes de segurança.

---

## 🚀 Instalação

### 1️⃣ **Pré-requisitos**
Antes de instalar a extensão, certifique-se de que o **Burp Suite** suporta extensões **Python**. Você pode verificar isso acessando:

> **Extender** → **BApp Store** → Verifique se "Python Environment" está instalado.

Se não estiver instalado, siga a documentação oficial do Burp Suite para configurar o ambiente Python.

---

### 2️⃣ **Baixar a Extensão**
Baixe o arquivo `BurpGBRLink.py` ou clone este repositório para obter a versão mais recente.

---

### 3️⃣ **Editar a Chave da API**
Antes de adicionar a extensão ao Burp Suite, **é necessário editar a variável de API**.

1. Abra o arquivo `BurpGBRLink.py` em qualquer editor de texto ou IDE.
2. Localize a linha onde está definida a variável `API_KEY`.
3. **Substitua** `""` pela sua **chave de API do Gbrlink**, conforme abaixo:

```python
API_KEY = "SUA_GBRLINK_API_KEY"  # 🔴 Substitua pela sua chave real
```

4. Salve o arquivo.

---

### 4️⃣ **Adicionar ao Burp Suite**
1. Abra o **Burp Suite**.
2. Vá até **Extender** → **Extensions**.
3. Clique em **Add**.
4. Escolha o tipo de extensão **Python**.
5. Selecione o arquivo `BurpGBRLink.py` que você editou.
6. Clique em **Next** e finalize a instalação.

Se tudo estiver correto, a extensão será carregada e integrada ao fluxo de trabalho do Burp Suite.

---

## ✅ Como Usar
- A extensão será executada automaticamente dentro do Burp Suite.
- O **Gbrlink** analisará os links capturados pelo proxy e identificará possíveis vulnerabilidades.
- Você pode visualizar os resultados diretamente no painel do **Extender Output** ou na aba correspondente no **Burp**.

---

## 🚨 Atenção
- **A chave de API é obrigatória!** O script **não funcionará** sem uma chave válida do Gbrlink.
- Se não possui uma chave, assine um plano no [Gbrlink](../README.md#assine-um-plano-e-comece-agora).

---

## 📩 Suporte
Se precisar de ajuda com a instalação ou tiver dúvidas, entre em contato via [contact@deeplooklabs.com](mailto:contact@deeplooklabs.com).

🚀 **Boas caçadas!**