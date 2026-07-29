---
title: "Air780EG 自行车定位器"
summary: "基于 Air780EG 的低功耗 4G 自行车定位器，支持北斗/GPS 双模卫星定位与 LBS 定位，可通过微信小程序查看位置和历史轨迹。"
date: 2025-01-15
updated: 2025-03-24
draft: false
featured: true
weight: 10

category: "hardware"
status: "stable"
status_note: "公开设计资料可用，当前作为稳定项目展示。"
tags:
  - Air780EG
  - LTE Cat.1
  - GNSS
  - 北斗 / GPS
  - LBS
  - 低功耗

cover: "cover.jpg"
license: "GPL-3.0"
repo: ""
oshwhub: "https://oshwhub.com/gbn2333/bicycle-locator-air780eg"
docs: ""
demo: ""

hardware:
  mcu: "Air780EG / EC618"
  communication:
    - "LTE Cat.1"
    - "GNSS"
    - "LBS"
  sensors: []
  power_input: "电池供电"
  outputs: []
  pcb: "公开硬件设计"
  risk: ""

software:
  languages:
    - Lua
  platforms:
    - "微信小程序"
    - "物联网平台 / 自建服务"
  protocols:
    - "LTE Cat.1"

metrics:
  project_count_label: "定位方式"
  project_count_value: "GNSS + LBS"
  highlight_1_label: "联网方式"
  highlight_1_value: "LTE Cat.1"

gallery: []

links:
  - name: "OSHWHub"
    url: "https://oshwhub.com/gbn2333/bicycle-locator-air780eg"

safety_notice: false
---

## Overview

Air780EG 自行车定位器把 LTE Cat.1 联网、北斗/GPS 双模卫星定位和 LBS 定位集成到低功耗设备中。设备可通过绑带安装在自行车上，并在微信小程序中查看位置、电量和历史轨迹。

## Hardware / software

硬件采用 Air780EG 模组、有源 GNSS 天线及低噪声放大方案，并针对电池供电和联网峰值电流设计电源切换。平台支持设置位置上传间隔，也可按公开说明接入物联网平台或自建服务。

## 状态说明

本页只概括已在 OSHWHub 公开的设计和能力，不宣称当前代码仍全部开放，也不扩展页面未确认的续航或定位精度数据。
