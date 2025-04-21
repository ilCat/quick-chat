# Image
FROM python:3.11-slim

# Create and use working directory
WORKDIR /server

# Copy dependencies and install
COPY ./requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY . .

# Expose Port and run server
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host=0.0.0.0", "--reload"]