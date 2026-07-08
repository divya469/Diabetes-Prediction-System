# 🩺 Diabetes Prediction System

A production-ready machine learning system that predicts diabetes risk based on health metrics. This project demonstrates a complete MLOps workflow from model training to API deployment using FastAPI, Docker, and Kubernetes.
<img width="1575" height="826" alt="image" src="https://github.com/user-attachments/assets/4db8c93f-932b-46e7-9646-01cd8e41fe9b" />
<img width="1919" height="983" alt="Screenshot 2026-04-21 180252" src="https://github.com/user-attachments/assets/8d48dae3-99cc-4399-a787-42066bbf5daa" />
<img width="1919" height="994" alt="Screenshot 2026-04-21 180221" src="https://github.com/user-attachments/assets/4dba8ad2-47d8-4866-9995-6468e342aabb" />


## ✨ Features

- **Machine Learning Model**: Random Forest Classifier trained on the Pima Indians Diabetes Dataset
- **RESTful API**: Built with FastAPI for high performance
- **CORS Support**: Enabled for cross-origin requests
- **Docker Support**: Containerized for easy deployment
- **Kubernetes Ready**: Includes deployment manifests for K8s
- **Model Persistence**: Uses joblib for model serialization
- **Interactive Documentation**: Auto-generated Swagger UI at `/docs`

## 📊 Problem Statement

This system predicts whether a person is at risk of diabetes based on five key health metrics:

| Feature | Description | Type |
|---------|-------------|------|
| **Pregnancies** | Number of pregnancies | Integer |
| **Glucose** | Plasma glucose concentration (mg/dl) | Float |
| **BloodPressure** | Diastolic blood pressure (mm Hg) | Float |
| **BMI** | Body Mass Index | Float |
| **Age** | Age in years | Integer |

**Dataset**: [Pima Indians Diabetes Dataset](https://www.kaggle.com/datasets/uciml/pima-indians-diabetes-database)

**Model**: Random Forest Classifier with default parameters

---

## 📁 Project Structure

```
diabetes-prediction-system/
├── main.py                              # FastAPI application
├── train.py                             # Model training script
├── requirements.txt                     # Python dependencies
├── Dockerfile                           # Docker container configuration
├── k8s-deploy.yml                       # Kubernetes deployment manifest
├── index.html                           # Frontend (optional)
├── script.js                            # Frontend scripts (optional)
├── style.css                            # Frontend styles (optional)
├── diabetes_model.pkl                   # Trained model (generated after train.py)
└── README.md                            # This file
```

---

## 🔧 Prerequisites

- **Python**: 3.8 or higher
- **pip**: Package manager for Python
- **Docker**: (Optional) For containerization
- **kubectl**: (Optional) For Kubernetes deployment

### System Requirements
- RAM: Minimum 2GB (4GB recommended)
- Disk Space: 500MB free space

---

## 📦 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/divyakjce123/Diabetes-Prediction-System.git
cd Diabetes-Prediction-System
```

### Step 2: Create Virtual Environment

**On Linux/macOS:**
```bash
python3 -m venv .mlops
source .mlops/bin/activate
```

**On Windows (PowerShell):**
```powershell
python -m venv .mlops
.\.mlops\Scripts\Activate.ps1
```

**On Windows (Command Prompt):**
```cmd
python -m venv .mlops
.mlops\Scripts\activate.bat
```

### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

**Dependencies:**
- `fastapi` - Web framework
- `uvicorn` - ASGI server
- `scikit-learn` - Machine learning library
- `pandas` - Data manipulation
- `joblib` - Model serialization

---

## 🚀 Usage

### Step 1: Train the Model

Run the training script to create the `diabetes_model.pkl` file:

```bash
python train.py
```

**Expected Output:**
```
✅ Columns: ['Pregnancies', 'Glucose', 'BloodPressure', 'BMI', 'Age', 'Outcome']
✅ Model saved as diabetes_model.pkl
```

### Step 2: Start the API Server

```bash
uvicorn main:app --reload
```

**Output:**
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
```

### Step 3: Test the API

#### Access Interactive Documentation:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

#### Health Check Endpoint:

```bash
curl http://localhost:8000/
```

**Response:**
```json
{"message": "Diabetes Prediction API is live"}
```

#### Make a Prediction:

**Using cURL:**
```bash
curl -X POST "http://localhost:8000/predict" \
  -H "Content-Type: application/json" \
  -d '{
    "Pregnancies": 2,
    "Glucose": 130,
    "BloodPressure": 70,
    "BMI": 28.5,
    "Age": 45
  }'
```

**Using Python:**
```python
import requests

url = "http://localhost:8000/predict"
data = {
    "Pregnancies": 2,
    "Glucose": 130,
    "BloodPressure": 70,
    "BMI": 28.5,
    "Age": 45
}

response = requests.post(url, json=data)
print(response.json())
```

**Response:**
```json
{"diabetic": true}
```

---

## 🔌 API Documentation

### Endpoints

#### 1. **GET** `/`
Health check endpoint to verify API is running.

**Response:**
```json
{
  "message": "Diabetes Prediction API is live"
}
```

#### 2. **POST** `/predict`
Make diabetes prediction based on health metrics.

**Request Body:**
```json
{
  "Pregnancies": 2,
  "Glucose": 130,
  "BloodPressure": 70,
  "BMI": 28.5,
  "Age": 45
}
```

**Response:**
```json
{
  "diabetic": true
}
```

**Status Codes:**
- `200 OK` - Prediction successful
- `422 Unprocessable Entity` - Invalid input format

---

## 🐳 Docker Deployment

### Build Docker Image

```bash
docker build -t diabetes-prediction-model:latest .
```

### Run Container Locally

```bash
docker run -p 8000:8000 diabetes-prediction-model:latest
```

**Access the API:**
```
http://localhost:8000/docs
```

### Push to Docker Registry

```bash
docker tag diabetes-prediction-model:latest <your-registry>/diabetes-prediction-model:latest
docker push <your-registry>/diabetes-prediction-model:latest
```

### Example Docker Compose (if needed)

```yaml
version: '3.8'

services:
  diabetes-api:
    image: diabetes-prediction-model:latest
    ports:
      - "8000:8000"
    environment:
      - PYTHONUNBUFFERED=1
```

---

## ☸️ Kubernetes Deployment

### Prerequisites
- Kubernetes cluster running (local or cloud)
- `kubectl` configured to access your cluster

### Deploy Application

```bash
kubectl apply -f k8s-deploy.yml
```

### Verify Deployment

```bash
# Check pods
kubectl get pods

# Check services
kubectl get svc

# View logs
kubectl logs -l app=diabetes-prediction

# Port forward to access locally
kubectl port-forward svc/diabetes-prediction-service 8000:8000
```

### Accessing the Application

```bash
# Get external IP (if using LoadBalancer)
kubectl get svc diabetes-prediction-service

# Access via port-forward
http://localhost:8000/docs
```

### Scale the Deployment

```bash
kubectl scale deployment diabetes-prediction --replicas=3
```

### Clean Up

```bash
kubectl delete -f k8s-deploy.yml
```

---

## 📊 Performance

| Metric | Value |
|--------|-------|
| Model Accuracy | ~77% (on test set) |
| Inference Time | < 10ms |
| API Response Time | < 50ms |
| Container Size | ~300MB |

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Guidelines
- Follow PEP 8 style guide for Python
- Add tests for new features
- Update documentation for changes
- Ensure all tests pass before submitting PR

---



## 🙋 Support

For issues and questions:
- **GitHub Issues**: [Open an issue](https://github.com/divyakjce123/Diabetes-Prediction-System/issues)
- **Documentation**: Check the docs at http://localhost:8000/docs

---

## 📚 Useful Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [scikit-learn RandomForest](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestClassifier.html)
- [Pima Indians Diabetes Dataset](https://www.kaggle.com/datasets/uciml/pima-indians-diabetes-database)
- [Docker Documentation](https://docs.docker.com/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)

---

