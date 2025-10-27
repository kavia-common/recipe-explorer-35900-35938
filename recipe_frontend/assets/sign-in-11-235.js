(function(){
  // CTA button click handler
  const cta = document.getElementById('button-54-668');
  if (cta) {
    cta.addEventListener('click', function(){
      // Placeholder interaction for Sign In
      console.log('Sign In CTA clicked');
    });
  }

  // Forgot password link
  const forgot = document.getElementById('text-12-94');
  if (forgot) {
    forgot.addEventListener('click', function(){
      console.log('Forgot Password clicked');
    });
  }
})();
