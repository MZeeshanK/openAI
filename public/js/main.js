const onSubmit = (e) => {
  e.preventDefault();

  document.querySelector('.msg').textContent = '';
  document.querySelector('#image').src = '';

  const prompt = document.querySelector('#prompt').value;
  const size = document.querySelector('#size').value;

  if (prompt === '') {
    alert('Please add some text');
    return;
  }

  generateImageRequest(prompt, size);
};

const generateImageRequest = async (prompt, size) => {
  try {
    showSpinner();

    const response = await fetch('/openai/generateimage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        size,
      }),
    });

    if (!response.ok) {
      removeSpinner();
      throw new Error('Image could not be generated');
    }

    const data = await response.json();
    // console.log(data);

    const imageUrl = data.data;

    document.querySelector('#image').style.display = 'block';
    document.querySelector('#image').src = imageUrl;

    removeSpinner();
  } catch (error) {
    document.querySelector('.msg').textContent = error;
  }
};

const showSpinner = () => {
  document.querySelector('.spinner').classList.add('show');
};

const removeSpinner = () => {
  document.querySelector('.spinner').classList.remove('show');
};

document.querySelector('#image').style.display = 'none';
document.querySelector('#image-form').addEventListener('submit', onSubmit);