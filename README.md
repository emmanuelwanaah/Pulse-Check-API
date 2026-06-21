# Pulse Check API (Watchdog Sentinel)

A Dead Man's Switch monitoring system designed to track remote devices such as solar farm sensors and weather stations. The system continuously monitors device heartbeats and automatically triggers alerts when a device stops communicating.

---

## Overview

Remote devices operating in low-connectivity environments can unexpectedly go offline due to power failure, network issues, or physical damage.

Pulse Check API allows administrators to register devices with a monitoring timeout. If a device fails to send a heartbeat before its timeout expires, the system automatically marks the device as DOWN and triggers an alert.

---

## Architecture Diagram

![System Architecture](docs/system%20architecture.png)

---

## Monitor Lifecycle State Diagram

![Monitor Lifecycle](docs/Monitor%20Lifecycle%20Flow.png)

---

## Features

- Register monitors
- Heartbeat monitoring
- Automatic timer reset
- Device failure detection
- Pause monitoring
- Alert generation
- Dashboard-ready architecture

---

## System Design

The system consists of the following components:

### Pulse Check API
Handles incoming requests from monitored devices.

### Monitor Service
Contains business logic for monitor registration, heartbeat processing, status updates, and alert generation.

### Monitor Timer Manager
Maintains active monitor timers using JavaScript Map storage and setTimeout.

### Alert Service
Triggers alerts whenever a monitor fails to send a heartbeat before its timeout expires.

### Monitoring Dashboard
Provides administrators with visibility into device status and monitoring information.

---

## API Endpoints

### Register Monitor

POST /monitors

Request:

```json
{
  "id": "device-123",
  "timeout": 60,
  "alert_email": "admin@critmon.com"
}
```

Response:

```json
{
  "success": true,
  "message": "Monitor created successfully"
}
```

---

### Send Heartbeat

POST /monitors/:id/heartbeat

Response:

```json
{
  "success": true,
  "message": "Heartbeat received"
}
```

---

### Pause Monitoring

POST /monitors/:id/pause

Response:

```json
{
  "success": true,
  "message": "Monitor paused successfully"
}
```

---

## Alert Behaviour

When a monitor fails to send a heartbeat before the configured timeout:

```json
{
  "ALERT": "Device device-123 is down!",
  "time": "2026-06-21T12:00:00.000Z"
}
```

The monitor status is automatically updated to:

```json
{
  "status": "down"
}
```

---

## Developer's Choice Feature

### Monitoring Dashboard

A dashboard architecture was added to improve observability.

Benefits:

- View active monitors
- View down devices
- Monitor device status
- Easier operational visibility for administrators

This feature makes the system more user-friendly by providing a centralized monitoring interface.

---

## Setup Instructions

Clone the repository:

```bash
git clone https://github.com/emmanuelwanaah/Pulse-Check-API.git
```

Install dependencies:

```bash
npm install
```

Create .env file:

```env
PORT=5000
```

Run the application:

```bash
npm run dev
```

or

```bash
npm start
```

Server:

```text
http://localhost:5000
```

---

## Future Improvements

- Email notifications
- Persistent database storage
- Webhook integrations
- Authentication and authorization
- Real-time dashboard updates

---

## Author

Emmanuel Wanaah