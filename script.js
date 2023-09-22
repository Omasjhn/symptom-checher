document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#form');
    const resultContainer = document.querySelector('.result');
    const button = document.querySelector('button');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        button.textContent = 'Getting results...';

        const gender = document.querySelector('.gender input[name="gender"]:checked').value;
        const age = document.querySelector('#ageInput').value;
        const symptoms = document.querySelector('.symptoms-input input').value;

        fetch(`https://symptom-checker-i1r1.onrender.com/?gender=${gender}&age=${age}&symptoms=${symptoms}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(results => {
                console.log('result', results);
                console.log('data', results[0]);
                console.log('disclaimer', results[1]?.Disclaimer);
                resultContainer.innerHTML = '';
                results[0].forEach(dataPoint => {
                    const dataElement = document.createElement('p');
                    dataElement.textContent = dataPoint;
                    dataElement.classList.add('data');
                    resultContainer.appendChild(dataElement);
                });
                const disclaimerElement = document.createElement('p');
                disclaimerElement.textContent = `Disclaimer: ${results[1]?.Disclaimer}`;
                disclaimerElement.classList.add('disclaimer');
                resultContainer.appendChild(disclaimerElement);
            })
            .catch(error => {
                console.error(error);
                window.alert('An error occurred while fetching results. Please try again later.');
            })
            .finally(() => {
                button.textContent = 'Get Results';
            });
    });
});
