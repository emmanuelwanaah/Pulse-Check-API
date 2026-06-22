# Pulse Check API (Watchdog Sentinel)

A Dead Man's Switch monitoring system designed to monitor remote devices such as solar farm sensors, weather stations, and IoT infrastructure. The system continuously tracks device heartbeats and automatically detects failures when a device stops communicating within a specified timeout period.

---

## Overview

Organizations operating remote infrastructure often face challenges detecting device failures in real time. A disconnected device may indicate network outages, hardware failures, power issues, or environmental damage.

Pulse Check API solves this problem by allowing administrators to register monitors with configurable timeout periods. Devices are expected to periodically send heartbeats to the API. If a heartbeat is not received before the timeout expires, the monitor is automatically marked as **DOWN** and an alert is triggered.

---

## Architecture Diagram

![System Architecture](docs/system%20architecture.png)

---

## Monitor Lifecycle State Diagram

![Monitor Lifecycle](docs/Monitor%20Lifecycle%20Flow.png)

---

## Features

* Register monitors
* Heartbeat monitoring
* Automatic timer reset
* Device failure detection
* Pause monitoring
* Resume monitoring
* Alert generation
* Device status tracking
* Live countdown timer
* Activity timeline logging
* Dashboard monitor overview
* Device details page
* Status filtering (Active, Paused, Down)

---

## System Design

The system consists of the following components:

### Pulse Check API

Handles incoming requests from monitored devices and administrators.

### Monitor Service

Contains the core business logic for:

* Monitor registration
* Heartbeat processing
* Status updates
* Timer management
* Alert generation

### Monitor Timer Manager

Maintains monitor timers using JavaScript's `setTimeout()` mechanism and in-memory `Map` storage.

### Alert Service

Responsible for generating alerts whenever a monitor fails to send a heartbeat before its configured timeout expires.

### Monitoring Dashboard

Provides administrators with a centralized interface for monitoring device health and operational status.

---

## API Endpoints

### Register Monitor

**POST /monitors**

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

**POST /monitors/:id/heartbeat**

Response:

```json
{
  "success": true,
  "message": "Heartbeat received"
}
```

---

### Pause Monitoring

**POST /monitors/:id/pause**

Response:

```json
{
  "success": true,
  "message": "Monitor paused successfully"
}
```

---

### Get All Monitors

**GET /monitors**

Response:

```json
{
  "success": true,
  "count": 3,
  "data": []
}
```

---

### Get Single Monitor

**GET /monitors/:id**

Response:

```json
{
  "success": true,
  "data": {
    "id": "device-123",
    "timeout": 60,
    "alert_email": "admin@critmon.com",
    "status": "active",
    "paused": false
  }
}
```

---

## Alert Behaviour

When a monitor fails to send a heartbeat before its configured timeout:

```json
{
  "ALERT": "Device device-123 is down!",
  "time": "2026-06-21T12:00:00.000Z"
}
```

The monitor status automatically changes to:

```json
{
  "status": "down"
}
```

---

## Monitoring Dashboard

The system includes a web-based monitoring dashboard that provides visibility into all registered devices.

### Dashboard Features

* View all registered monitors
* Monitor device status in real time
* Filter monitors by status

  * Active
  * Paused
  * Down
* Navigate to device details pages
* View monitor information at a glance

---

## Device Details Page

Each monitor includes a dedicated details page displaying:

* Device ID
* Alert Email
* Timeout Duration
* Created Date
* Current Status
* Remaining Time Countdown

Administrators can perform the following actions:

* Send Heartbeat
* Pause Monitoring
* Resume Monitoring

---

## Activity Timeline

Every monitor records important lifecycle events, including:

* Monitor Registered
* Heartbeat Received
* Monitoring Paused
* Device Down

These events are displayed chronologically to provide operational visibility and aid troubleshooting.

---

## Developer's Choice Feature

### Monitoring Dashboard

A complete monitoring dashboard was implemented to improve observability and usability.

Benefits include:

* Centralized monitor management
* Improved operational visibility
* Faster incident detection
* Easier monitoring of device health
* Better user experience for administrators

---

## Setup Instructions

Clone the repository:

```bash
git clone https://github.com/emmanuelwanaah/Pulse-Check-API.git
```

Navigate to the project:

```bash
cd Pulse-Check-API
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

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

Server URL:

```text
http://localhost:5000
```

---

## Future Improvements

* Email notifications
* SMS notifications
* Persistent database storage
* Webhook integrations
* Authentication and authorization
* WebSocket-based real-time updates
* Historical monitoring analytics
* Distributed monitor storage
* Cloud deployment support

---

## Technologies Used

* Node.js
* Express.js
* JavaScript (ES6+)
* HTML
* CSS
* Tailwind CSS
* Material Symbols
* REST API Architecture

---

## Author

**Emmanuel Wanaah**

