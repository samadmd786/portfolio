# Md Samad

Chicago, IL | (614) 806-0483 | samadmd6020@gmail.com | [md-samad.com](https://md-samad.com) | [linkedin.com/in/md-samad-msu](https://www.linkedin.com/in/md-samad-msu/) | [github.com/samadmd786](https://github.com/samadmd786)

---

## Summary

MS Computer Science from UChicago. At Vanguard I delivered **99.999% uptime** handling **100,000+ peak hourly logons** and cut security incidents by **40%** across a platform serving **50M+ investors**. I build cloud-native infrastructure, secure IAM pipelines, and agentic AI tools that reach production.

---

## Education

**The University of Chicago** - MS in Computer Science
_Sep 2025 – Jun 2026_
Coursework: Cloud Computing, Distributed Systems, Generative AI, Computer Security, Networks

**Michigan State University** - BS in Computer Science | GPA: 3.9/4.0
_Aug 2018 – May 2022_
- **Dean's List for 5 semesters**
- Coursework: Machine Learning, Computer Systems, Database Systems, Object Oriented Programming, Algorithms, Mobile App Development

---

## Skills

**Cloud Platforms:** AWS (EC2, ECS, IAM, CloudFormation, Lambda, S3, SQS, SNS, DynamoDB, Step Functions, Glacier, SES, Security Hub, Auto Scaling, Route 53)

**Programming Languages:** Python, Bash, C++, C, Java, SQL, JavaScript, HTML, CSS, Rego, PowerShell, JSON, YAML

**Frameworks & Libraries:** Flask, FastAPI, Streamlit, NumPy, PyTest, Open Policy Agent (OPA), Redis, ZeroMQ, sentence-transformers, LangGraph, Anthropic SDK, OpenAI SDK, Selenium

**DevOps & Tools:** Docker, Kubernetes, Helm, Terraform, Jenkins, Bamboo, GitHub Actions, Git, Crossplane, Splunk, Grafana, Datadog, Confluence, LocalStack, Moto

**Architecture & Systems:** Microservices, Sidecar Pattern, CI/CD Pipelines, REST APIs, Event-Driven Architecture, Distributed Systems, IaaS, PaaS, Linux Fundamentals

**Security & Identity:** IAM, RBAC, MFA, Auth0, Okta, OAuth 2.0, OIDC, SAML 2.0, SSO, OPA Policy-as-Code, AWS Security Hub, Kong API Gateway, Envoy Proxy

**AI / ML:** LangGraph, RAG pipelines, ReAct agents, vector embeddings, prompt engineering, sentence-transformers, HuggingFace, GPT-4o, Groq/Llama 3.3 70B

**Certifications:** AWS Solutions Architect Associate (2025), AWS Cloud Practitioner (2023)

---

## Professional Experience

**University of Chicago** - Graduate Teaching Assistant, Cloud Computing (MPCS 51083)
_Mar 2026 – Jun 2026_
- Supported graduate students through complex cloud architecture assignments covering **AWS, Kubernetes, and distributed systems** - answering technical questions during office hours and online
- Graded assignments and provided detailed feedback on **cloud infrastructure design, IaC, and system architecture** decisions; bridged theory and industry practice drawing on hands-on Vanguard experience

**Vanguard** - Senior Software Engineer
_Dec 2023 – Jun 2025_
- Launched the new AWS auth platform to **500,000 daily logons** across **50M+ Vanguard investors** at **99.999% availability**; onboarded **10 platform teams** and mentored **20 engineers** (2 per team) on the microservices architecture, Auth0 integration, and deployment workflows
- Reduced **p99 authentication latency by 10ms** by instrumenting distributed monitoring across **10 microservices** using **Grafana and Splunk**, cutting incident detection time by **45%**
- Optimized **Envoy service mesh and Kong API Gateway** integration across microservices architecture, increasing request throughput by **50%**
- Reduced AWS security incidents by **40%** by rolling out **Auth0 MFA + RBAC** and **OPA policy-as-code** (Rego) for dynamic policy evaluation across distributed microservices
- Designed fine-grained **IAM roles, policies, and permission boundaries** across multi-account AWS environments, enforcing least-privilege access at scale
- Served in a **7-day on-call rotation every 6 weeks** for the production auth platform; jumped into multiple live incidents across platform teams, helping diagnose and resolve production issues on critical auth paths
- Prototyped a real-time **AI video assistant POC** by integrating a **HuggingFace Llama model** into LLM pipelines, collaborating with a cross-functional team of 10+ engineers on conversational financial education modules

**Vanguard** - Software Engineer
_Jun 2022 – Dec 2023_
- Led POC-to-production migration of on-premises monolithic login infrastructure to AWS microservices; integrated the **Auth0 SDK** for identity, **Kong as API gateway**, **Nginx** for routing, and **OPA + Envoy in a sidecar pattern** for policy enforcement and traffic management - laying the foundation for org-wide platform adoption
- Implemented **OIDC-based authentication flows and distributed session management** across microservices, solving cross-service session consistency challenges introduced by decomposing the monolith
- Built **Bamboo CI/CD pipelines** with **canary and blue/green deployment** strategies - automated repo builds into Docker images and deployments to AWS
- Built a **local Docker-based testing platform** (multi-image) with an automated **PyTest and Selenium** API testing framework, replacing a **45-minute** end-to-end pipeline build cycle with a **5-minute** local test loop and raising test coverage by **60%** across auth services
- Configured and optimized **Envoy proxy**, achieving a **30% improvement** in request processing times across internal service mesh
- Spearheaded enterprise **SSO integration** using Okta, Auth0, SAML 2.0 and OAuth 2.0 across internal applications; designed and shipped user-facing JavaScript interfaces

**Delta Dental** - DevOps and Automation Engineer
_Nov 2021 – May 2022_
- Eliminated redundant build steps using **Jenkins shared libraries**, boosting pipeline efficiency by **90%**
- Implemented **Docker containerization and Kubernetes orchestration**, enhancing scalability and fault tolerance across services
- Automated operational tasks with **PowerShell and Bash**, cutting task completion time by **30%**
- Reduced CI/CD security risk by implementing **RBAC and secure secrets protocols** informed by pipeline vulnerability assessments

**TIAA** - Software Engineer Intern
_Jun 2021 – Aug 2021_
- Delivered a Python-based scoring model API (Flask, NumPy) with **80% SonarQube coverage** through PyTest-driven development
- Optimized thread management and asynchronous processing, raising concurrent-request capacity by **75%**
- Implemented automated testing within Jenkins CI/CD pipelines, reducing non-production bugs

---

## Projects

**[CloudGuard AI - Agentic AWS Security Risk Analyzer](https://github.com/samadmd786/cloudguard)** | Python, Groq/Llama 3.3 70B, Streamlit, sentence-transformers, RAG, AWS Security Hub
_Jan 2026 – Mar 2026_
- Built an agentic Security Hub analyzer with a 3-tier pipeline: schema-enforced LLM output for standard findings, pre-fetch enrichment (NVD CVE lookup, AWS docs retrieval, compliance mapping) for HIGH/CRITICAL findings, and RAG over past findings for org-aware analysis; live at [cloudguard.streamlit.app](https://cloudguard.streamlit.app/)
- Implemented org-aware **RAG pipeline** using sentence-transformers + cosine similarity over a local JSON vector store, auto-building organizational memory with each analysis to enrich future LLM calls with historical context
- Generates schema-enforced JSON output mapped across **5 compliance frameworks** (CIS, PCI DSS, SOC 2, NIST 800-53, ISO 27001) with authoritative AWS/NVD citations and exportable Markdown reports
- Validated by **20+ PyTest unit tests** with mocked boto3 and Groq clients; rate-limited at 20 analyses/hour per session; per-session AWS credential isolation (keys never touch server)

**[Cheetah.ai - Multi-Agent KV Cache Orchestrator](https://github.com/samadmd786/cheetah.ai)** | Python, Snowflake, Cortex AI (Llama-70B), SimHash, vllm-mlx, Streamlit
_Uncommon Hacks 2026, University of Chicago - **Winner: Best Use of Snowflake**_
- Engineered a shared context bridge for multi-agent inference: a DAG-aware orchestrator reads the workflow manifest to pre-warm KV caches in the gap between agent calls, reducing pipeline TTFT from **110s to 40.86s** (2.69x speedup on a harder multi-document workload); downstream agents see up to **70x speedup** on cache hits (35s to 0.5s)
- Built a prompt bridge enforcing canonical `[SYS] + [DOC] + [TASK]` structure with SHA-256 fingerprinting for byte-stable prefix sharing; SimHash near-duplicate detection (Hamming distance <= 10/64) catches amended documents that exact-prefix caching would miss; budget-aware LRU evicts based on next-in-manifest rather than last-used
- Integrated Snowflake as the active analytics backbone: streamed live orchestrator telemetry into Dynamic Tables for a real-time performance leaderboard; used Cortex AI (Llama 3.1 70B) directly within the database to auto-generate natural-language run summaries

**NucleusCloud - Cloud-Native Bioinformatics Pipeline** | Python, Flask, AWS, CloudFormation
- Built a fully **event-driven bioinformatics pipeline** on AWS primitives - Flask frontend with signed S3 uploads, SQS/SNS-orchestrated workers, Lambda for Glacier hydration, Step Functions for delay-based archival, Stripe for premium-tier billing, and Globus Auth for identity
- Implemented automated cold-storage lifecycle management migrating Basic-tier data to **AWS Glacier** with Expedited/Standard restore on Pro upgrade, balancing cost vs. retrieval SLA
- Provisioned the entire stack via a single **CloudFormation template**; built LocalStack + Moto offline testing environment for full distributed-system iteration on a laptop

**Dispatch - Serverless FaaS Platform Built from Scratch** | Python, FastAPI, Redis, ZeroMQ, dill, PyTest
- Built a function-as-a-service platform from scratch: **FastAPI REST server** for function registration and invocation, **Redis-backed task queue**, and a dispatcher supporting **three worker modes** - local multiprocessing, ZMQ REQ/REP pull, and ZMQ DEALER/ROUTER push
- Push mode peaks at **248 tasks/sec**; local mode achieves near-ideal parallel throughput at 8 workers; functions serialized with **dill** for arbitrary Python payload execution
- Validated by **72 tests** with mocked Redis and ZMQ

**[Labyrinth - Agentic Digital Privacy Tool](https://labyrinth-rrkj.onrender.com/)** | Python, LangGraph, Streamlit
- Built autonomous AI agents using **LangGraph** that discover and surface forgotten "zombie" online accounts sitting exposed across the web; live at [labyrinth-rrkj.onrender.com](https://labyrinth-rrkj.onrender.com/)
- Scans against **LeakCheck** and **HaveIBeenPwned** APIs to quantify breach exposure across DataClasses (passwords, SSN, credit cards); cross-references breach data with the user's email history to flag forgotten accounts
- Custom dark-mode glassmorphism UI with dynamic risk scoring based on industry forensic criteria

**[SubRecon - Attack Surface Management Tool](https://github.com/samadmd786/zombie_hunter)** | Python, Streamlit, Playwright
- Built a recon tool aggregating subdomain enumeration data from HackerTarget, crt.sh, and RapidDNS; probes for hidden API documentation (`/swagger.json`, `/v2/api-docs`, `/actuator/health`) and mines HTML source for sensitive comments (TODO, API_KEY, FIXME)
- Implemented risk scoring (Critical/High/Medium/Low) with a Streamlit dashboard, automated screenshot evidence gallery, and trend analysis of security posture over time
- Supports mass scan (companies in `targets.txt`), single-domain (with subdomain enum), and direct-URL scan modes

**[AI-Powered Hangman](https://github.com/samadmd786/hangman)** | Python, Streamlit, OpenAI GPT-4o-mini
- Built a word-guessing game powered by **GPT-4o-mini** for AI word generation, context-aware hints, and post-game analysis; live at [ai-hangman.streamlit.app](https://ai-hangman.streamlit.app/)
- Implemented live win-probability gauge using a **hypergeometric distribution** model averaged across candidate words matching the current board state
- Designed graceful offline fallback - game runs on a curated word list when no API key is provided

**[Snake in Jack - nand2tetris Capstone Project](https://github.com/samadmd786/Snake_in_Jack)** | Jack, Hack VM, nand2tetris
- Implemented Snake in **Jack** on the Hack platform from the [nand2tetris course](https://www.nand2tetris.org/), which builds a complete computer bottom-up from NAND gates through ALU, CPU, assembler, VM translator, compiler, and OS
- Exercise in low-level CS fundamentals - instruction sets, stack-based VM execution, memory layout, and compiler-targeted high-level language design - complementing my cloud and distributed systems work

---

## Leadership & Involvement

**National Society of Collegiate Scholars** - Member
_May 2020 – Present | Michigan State University_
- Invited based on academic aptitude and leadership potential; engaged in building school connections, leadership development, and service opportunities

**University Activities Board** - Volunteer Staff
_Oct 2018 – May 2022 | Michigan State University_
- Volunteered at campus events hosting **100+ undergraduate students**; coordinated with **20+ team members** during weekly meetups to organize executive events each semester

---

## Achievements

- **MS in Computer Science** - The University of Chicago (2026)
- **Winner: Best Use of Snowflake** - Uncommon Hacks 2026, University of Chicago
- **AWS Solutions Architect Associate** (2025)
- **AWS Cloud Practitioner** (2023)
- **Dean's List** for 5 semesters at Michigan State University (GPA 3.9/4.0)
- Built and launched AWS auth infrastructure at Vanguard handling **500,000 daily logons** (100,000+ peak hourly) at **99.999% uptime** serving **50M+ investors**; onboarded 10 platform teams post-migration
- Mentored **20 engineers** across 10 teams during platform adoption at Vanguard
- Reduced security incidents by **40%** at Vanguard across 50M+ investors in production
- Built and deployed **5 production AI/cloud apps** (CloudGuard AI, Cheetah.ai, Labyrinth, AI-Powered Hangman, SubRecon)
