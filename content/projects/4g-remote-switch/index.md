---
title: "4G 智能远程通断器"
summary: "基于 Air780E 的 4G 无线通断器，支持小程序控制、4 路继电器、温湿度采集和 433MHz 本地遥控。"
date: 2024-01-19
updated: 2025-03-24
draft: false
featured: true
weight: 10

category: "hardware"
status: "archived"
status_note: "停止公开维护，仅保留技术资料和项目索引。"
tags:
  - Air780E
  - 4G
  - MQTT
  - Lua
  - SHT30
  - 433MHz
  - Relay
  - PCB

cover: "/assets/relay-board-1.png"
license: "GPL-3.0"
repo: "https://github.com/fairycloudpublic/FairyCloud_AIR780E_4DB_PUBLIC"
oshwhub: "https://oshwhub.com/gbn2333/outdoor-camping-microwave-radar-alarm"
docs: ""
demo: ""

hardware:
  mcu: "Air780E / EC618"
  communication:
    - "4G LTE"
    - "MQTT"
    - "433MHz Remote"
  sensors:
    - "SHT30 温湿度"
  power_input: "5-18V"
  outputs:
    - "4 路继电器"
  pcb: "2 次打样"
  risk: "可能涉及 220V 强电"

software:
  languages:
    - Lua
  platforms:
    - "涂鸦智能"
    - "私有服务器"
  protocols:
    - MQTT
    - IIC

metrics:
  project_count_label: "继电器输出"
  project_count_value: "4 路"
  highlight_1_label: "通信方式"
  highlight_1_value: "4G / MQTT"

gallery:
  - src: "/assets/relay-board-1.png"
    alt: "4G 智能远程通断器硬件正面"
  - src: "/assets/relay-board-2.png"
    alt: "4G 智能远程通断器硬件侧面"

links:
  - name: "GitHub"
    url: "https://github.com/fairycloudpublic/FairyCloud_AIR780E_4DB_PUBLIC"
  - name: "OSHWHub"
    url: "https://oshwhub.com/gbn2333/outdoor-camping-microwave-radar-alarm"

safety_notice: true
---

## Overview

4G 智能远程通断器用于把继电器控制、环境采集和远程联网放到一块可部署的硬件板上。它通过 Air780E 接入蜂窝网络，用 MQTT 与服务器或平台通信，并提供 4 路继电器输出。

项目重点不是单个传感器，而是从硬件、电源、通信、固件到实际控制链路的完整闭环。它适合用来验证远程设备控制、离线场景下的 4G 联网和本地遥控备份。

## Why I built it

这个项目来自对户外、机房、临时设备和远程电源管理的需求：设备可能没有稳定 Wi-Fi，但仍然需要可靠联网和远程通断控制。4G 模组让部署位置更自由，433MHz 遥控提供本地兜底入口。

## Hardware design

主控和通信使用 Air780E / EC618，继电器区提供 4 路输出，温湿度采集使用 SHT30，板上同时考虑了 433MHz 遥控输入。电源输入面向 5-18V 场景，PCB 经过多轮打样来验证布局、引脚和强弱电隔离。

涉及继电器和可能的市电负载时，外壳、端子、保险、走线间距和接地必须单独评估，不能把开发板验证等同于可直接商用。

## Firmware / software

固件以 Lua 为主，负责 MQTT 连接、继电器状态同步、传感器采集和本地遥控事件处理。云端或平台侧负责展示设备状态、下发控制命令并记录关键事件。

## Revision log

- 2024-09-22: V1.0 验证核心板 IC 与基础代码。
- 2024-10-16: V1.1 调整硬件结构和平台代码。
- 2024-11-24: V1.3 接入 OneNet，优化硬件引脚和联网链路。

## Safety

涉及强电或高功率负载时，必须由具备经验的人完成接线和外壳设计。调试阶段建议使用隔离电源、限流保护和低压负载验证，不要裸板接入市电长期运行。

## Links

项目代码和公开资料见页面上方链接。后续如果恢复维护，可以继续在本页补充固件版本、PCB 文件、图片图库和风险说明。
