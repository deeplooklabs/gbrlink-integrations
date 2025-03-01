# Burp Suite - Integración con Gbrlink

**[Read this in English](README.md) | [Leia isso em Português](README.pt.md)**

Esta extensión permite integrar **Gbrlink** directamente en **Burp Suite**, facilitando el análisis automatizado de enlaces rotos durante sus pruebas de seguridad.

---

## 🚀 Instalación

### 1️⃣ **Requisitos Previos**
Antes de instalar la extensión, asegúrate de que **Burp Suite** admite extensiones **Python**. Puedes verificarlo accediendo a:

> **Extender** → **BApp Store** → Verifica si "Python Environment" está instalado.

Si no está instalado, sigue la documentación oficial de Burp Suite para configurar el entorno Python.

---

### 2️⃣ **Descargar la Extensión**
Descarga el archivo `BurpGBRLink.py` o clona este repositorio para obtener la versión más reciente.

---

### 3️⃣ **Editar la Clave de API**
Antes de agregar la extensión a Burp Suite, **es necesario editar la variable de API**.

1. Abre el archivo `BurpGBRLink.py` en cualquier editor de texto o IDE.
2. Localiza la línea donde está definida la variable `API_KEY`.
3. **Sustituye** `""` por tu **clave de API de Gbrlink**, como se muestra a continuación:

```python
API_KEY = "TU_GBRLINK_API_KEY"  # 🔴 Sustituye con tu clave real
```

4. Guarda el archivo.

---

### 4️⃣ **Agregar a Burp Suite**
1. Abre **Burp Suite**.
2. Ve a **Extender** → **Extensions**.
3. Haz clic en **Add**.
4. Selecciona **Python** como el tipo de extensión.
5. Escoge el archivo `BurpGBRLink.py` que editaste.
6. Haz clic en **Next** y finaliza la instalación.

Si todo está correcto, la extensión se cargará e integrará en el flujo de trabajo de Burp Suite.

---

## ✅ Cómo Usar
- La extensión se ejecutará automáticamente dentro de Burp Suite.
- **Gbrlink** analizará los enlaces capturados por el proxy e identificará posibles vulnerabilidades.
- Puedes ver los resultados directamente en el panel **Extender Output** o en la pestaña correspondiente en **Burp**.

---

## 🚨 Atención
- **¡La clave de API es obligatoria!** El script **no funcionará** sin una clave válida de Gbrlink.
- Si no tienes una clave, suscríbete a un plan en [Gbrlink](https://gbrlink.com) para obtener acceso a la API.

---

## 📩 Soporte
Si necesitas ayuda con la instalación o tienes dudas, contáctanos en [contact@deeplooklabs.com](mailto:contact@deeplooklabs.com).

🚀 **¡Felices cacerías!**