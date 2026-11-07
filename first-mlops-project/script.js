const form = document.getElementById('predictionForm');
const resultDiv = document.getElementById('result');
const loadingDiv = document.getElementById('loading');
const resultIcon = document.getElementById('resultIcon');
const resultTitle = document.getElementById('resultTitle');
const resultMessage = document.getElementById('resultMessage');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    console.log('Form submitted!'); // Debug log
    
    // Get form data
    const formData = {
        Pregnancies: parseInt(document.getElementById('pregnancies').value),
        Glucose: parseFloat(document.getElementById('glucose').value),
        BloodPressure: parseFloat(document.getElementById('bloodPressure').value),
        BMI: parseFloat(document.getElementById('bmi').value),
        Age: parseInt(document.getElementById('age').value)
    };
    
    console.log('Form data:', formData); // Debug log
    
    // Show loading
    resultDiv.classList.add('hidden');
    loadingDiv.classList.remove('hidden');
    
    try {
        // Make API call
        console.log('Making API call...'); // Debug log
        const response = await fetch('http://127.0.0.1:8000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        console.log('Response status:', response.status); // Debug log
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        console.log('Response data:', data); // Debug log
        
        // Hide loading
        loadingDiv.classList.add('hidden');
        
        // Show result
        resultDiv.classList.remove('hidden');
        
        if (data.diabetic) {
            resultDiv.classList.remove('negative');
            resultDiv.classList.add('positive');
            resultIcon.textContent = '⚠️';
            resultTitle.textContent = 'High Risk Detected';
            resultMessage.textContent = 'Based on the provided health metrics, the model predicts a higher risk of diabetes. Please consult with a healthcare professional for proper diagnosis and guidance.';
        } else {
            resultDiv.classList.remove('positive');
            resultDiv.classList.add('negative');
            resultIcon.textContent = '✅';
            resultTitle.textContent = 'Low Risk';
            resultMessage.textContent = 'Based on the provided health metrics, the model predicts a lower risk of diabetes. Continue maintaining a healthy lifestyle and regular check-ups.';
        }
        
        console.log('Result displayed!'); // Debug log
        
    } catch (error) {
        console.error('Error:', error); // Debug log
        loadingDiv.classList.add('hidden');
        resultDiv.classList.remove('hidden', 'positive', 'negative');
        resultDiv.style.background = '#fff3cd';
        resultDiv.style.border = '2px solid #ffc107';
        resultIcon.textContent = '❌';
        resultTitle.textContent = 'Error';
        resultTitle.style.color = '#856404';
        resultMessage.textContent = 'Failed to connect to the prediction service. Please make sure the API server is running on http://127.0.0.1:8000. Error: ' + error.message;
    }
});
