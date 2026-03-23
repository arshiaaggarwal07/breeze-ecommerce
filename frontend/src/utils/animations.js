export const fadeIn = (element) => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(20px)';
  
  requestAnimationFrame(() => {
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
  });
};

export const addToCartAnimation = (element, targetElement) => {
  const clone = element.cloneNode(true);
  const rect = element.getBoundingClientRect();
  const targetRect = targetElement.getBoundingClientRect();

  clone.style.position = 'fixed';
  clone.style.top = `${rect.top}px`;
  clone.style.left = `${rect.left}px`;
  clone.style.width = `${rect.width}px`;
  clone.style.height = `${rect.height}px`;
  clone.style.transition = 'all 0.8s ease-in-out';
  clone.style.zIndex = '1000';
  clone.style.pointerEvents = 'none';

  document.body.appendChild(clone);

  requestAnimationFrame(() => {
    clone.style.transform = `translate(${targetRect.left - rect.left}px, ${targetRect.top - rect.top}px) scale(0.2)`;
    clone.style.opacity = '0';
  });

  setTimeout(() => {
    document.body.removeChild(clone);
  }, 800);
};

export const filterAnimation = (elements, filter) => {
  elements.forEach(element => {
    if (filter === 'all' || element.dataset.category === filter) {
      element.style.opacity = '0';
      element.style.transform = 'scale(0.8)';
      element.style.display = 'block';
      
      requestAnimationFrame(() => {
        element.style.transition = 'all 0.5s ease';
        element.style.opacity = '1';
        element.style.transform = 'scale(1)';
      });
    } else {
      element.style.opacity = '0';
      element.style.transform = 'scale(0.8)';
      
      setTimeout(() => {
        element.style.display = 'none';
      }, 500);
    }
  });
};