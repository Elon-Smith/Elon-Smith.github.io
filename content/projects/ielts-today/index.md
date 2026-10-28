---
title: "IELTS TODAY"
subtitle: "让口语练习有反馈，让教师复核更方便"
summary: "为学生提供口语练习与反馈，为教师提供录音评测、回听和人工复核工具，让练习与教学形成连续的反馈过程。"
description: "Elon-Smith 独立完成的 AI 口语练习与辅助评测平台，连接学生练习、AI 反馈和教师人工复核。"
date: 2026-07-27
updated: 2026-10-28
draft: false
featured: true
weight: 1
category: "software"
display_category: "AI 应用 / 语言学习"
status: "active"
status_label: "持续维护"
status_note: "学生端与教师端持续维护；评测结果为 AI 辅助反馈。"
contribution: "需求与产品设计、前后端开发、AI 评测流程、部署与维护。独立完成，AI 辅助开发。"
capabilities:
  - 实时口语练习
  - AI 辅助评测
  - 教师人工复核
tags:
  - React / TypeScript
  - Python / FastAPI
  - WebRTC
  - 音频处理
cover: "teacher-review.jpg"
showcase_layout: "desktop"
showcase:
  - src: "teacher-review.jpg"
    alt: "IELTS TODAY 教师复核界面，展示虚拟学员的辅助反馈与教师点评"
showcase_caption: "教师复核界面演示 · 学员、文稿和评分均为虚拟示例数据"
license: "Proprietary"
links:
  - name: "访问网站"
    url: "https://ielts-today.com/"
software:
  languages: [TypeScript, Python]
  platforms: [React, FastAPI]
  protocols: [REST API, WebRTC]
safety_notice: false
---

## 解决的问题

口语练习需要及时反馈，教师也需要方便地回听录音、整理点评和跟进学生。我希望把这些环节连接起来：学生能够持续练习，教师能够在 AI 辅助反馈的基础上保留自己的判断。

## 使用方式

- **学生练习**：围绕口语题目进行实时练习，查看反馈和学习记录。
- **AI 辅助反馈**：处理录音与转写，按不同维度提供反馈和改进建议。
- **教师复核**：在工作台中管理学生与评测记录，回听、查看文稿、补充点评，复核后导出报告。

![教师工作台：使用虚拟学员展示待复核队列](teacher-workspace.jpg)

*教师工作台界面演示，所有学员及评测记录均为虚拟示例数据。*

## 我的工作

项目由我独立完成，AI 作为开发过程中的辅助工具。我负责需求与产品设计、前后端开发、音频与 AI 评测流程，以及部署和日常维护。

开发中，我把教师的复核过程作为一个完整流程来处理：从找到待批改记录，到回听、填写点评，再到完成复核与生成报告。AI 反馈与教师判断在界面和状态上保持清楚的区分。

## 当前成果

项目已形成学生端与教师端网页，并持续维护。学生端覆盖练习和反馈；教师端覆盖学生管理、录音评测、待复核队列、点评和报告导出。

这里展示的是产品使用流程，不以示例分数证明评分准确率或学习效果。所有评测结果均为 AI 辅助反馈，并非 IELTS 官方成绩。

## 技术实现

前端使用 React 与 TypeScript，服务端使用 Python 与 FastAPI。项目涉及实时音频交互、录音处理、评测任务管理、账户权限和数据维护。技术选择服务于练习与教学的实际使用流程。
