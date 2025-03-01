// Form Submission Handler
document.getElementById("contact-form").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    // Form Elements
    const elements = {
      name: document.getElementById("contact-name"),
      email: document.getElementById("contact-email"),
      subject: document.getElementById("contact-subject"),
      message: document.getElementById("contact-message"),
    };
  
    // Validate Elements
    if (Object.values(elements).some((el) => !el)) {
      showError("Form elements missing");
      return;
    }
  
    // Get Values
    const formData = {
      name: elements.name.value,
      email: elements.email.value,
      subject: elements.subject.value,
      message: elements.message.value,
      timestamp: Date.now(),
    };
  
    try {
      showLoading();
  
      // Save to Firebase under 'contacts' node (firebase and database are already defined)
      const newRef = database.ref("contacts").push();
      await newRef.set(formData);
  
      showSuccess();
      e.target.reset();
    } catch (error) {
      showError(error.message);
    } finally {
      hideLoading();
    }
  });
  
  // Utility Functions
  function showLoading() {
    document.querySelector("#contact-form .loading").style.display = "block";
    hideMessages();
  }
  
  function hideLoading() {
    document.querySelector("#contact-form .loading").style.display = "none";
  }
  
  function showSuccess() {
    document.querySelector("#contact-form .sent-message").style.display = "block";
    document.querySelector("#contact-form .error-message").style.display = "none";
  }
  
  function showError(message) {
    document.querySelector("#contact-form .error-message").style.display = "block";
    document.querySelector("#contact-form .error-message").textContent = message;
    document.querySelector("#contact-form .sent-message").style.display = "none";
  }
  
  function hideMessages() {
    document.querySelector("#contact-form .sent-message").style.display = "none";
    document.querySelector("#contact-form .error-message").style.display = "none";
  }