---
title: "Gemini Live Gateway"
summary: "基于 Gemini Live API 的实时多模态网页和 OpenAI 兼容 API 网关，支持文字、语音、摄像头和屏幕共享。"
date: 2026-06-12
updated: 2026-06-12
draft: false
featured: true
weight: 20

category: "opensource"
status: "active"
status_note: "公开维护中。"
tags:
  - Gemini
  - Live API
  - OpenAI Compatible
  - WebSocket
  - Multimodal
  - TypeScript

cover: ""
license: "MIT"
repo: "https://github.com/Elon-Smith/gemini-live-gateway"
oshwhub: ""
docs: "https://github.com/Elon-Smith/gemini-live-gateway#readme"
demo: ""

hardware:
  mcu: ""
  communication: []
  sensors: []
  power_input: ""
  outputs: []
  pcb: ""
  risk: ""

software:
  languages:
    - TypeScript
  platforms:
    - "Web"
    - "Gemini Live API"
  protocols:
    - WebSocket
    - OpenAI-compatible API

metrics: {}
gallery: []

links:
  - name: "GitHub"
    url: "https://github.com/Elon-Smith/gemini-live-gateway"
  - name: "README"
    url: "https://github.com/Elon-Smith/gemini-live-gateway#readme"

safety_notice: false
---

## Overview

Gemini Live Gateway 把 Gemini Live API 封装成一个可部署的实时多模态网页，同时提供 OpenAI 兼容 API 代理。准备 Gemini API Key 后，就可以部署支持文字、语音、摄像头、屏幕共享的交互入口。

## Why I built it

很多客户端和工作流已经兼容 OpenAI API 格式，但实时多模态能力需要额外的网关和前端交互层。这个项目把演示、代理和部署入口放在一起，降低实验成本。

## Hardware design

这是纯软件项目，不涉及硬件设计。

## Firmware / software

项目侧重实时连接、浏览器多媒体输入、API 转发和兼容层。后续维护重点是跟进 Gemini Live API 行为变化、优化部署文档，并明确密钥管理方式。

## Revision log

- 2026-06-12: 建立公开项目页，纳入 BEINING.UK 项目集合。

## Safety

部署时不要把 API Key 写入前端公开代码。建议使用服务端环境变量或部署平台的密钥管理功能。

## Links

代码、安装和部署说明见 GitHub README。
