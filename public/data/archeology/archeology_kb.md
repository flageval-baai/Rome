## Knowledge Base Wiki – Digital Archaeological Scanning and Preservation

This document presents the complete set of internal concepts, formulas, and classification systems that guide our digital-archaeology practice.  It is written for a public audience and is self-contained: no prior knowledge of our database structure is required.  All mathematical expressions use conventional notation, and every concept appears exactly as it is defined in the corporate knowledge bank.

---

### 1.  Foundations of Scan Quality

The **Scan Resolution Index (SRI)** measures the intrinsic sharpness of a scan by balancing physical resolution against point density.  It is computed as

$$
\text{SRI}= \frac{\log_{10}\!\bigl(\text{Scan Resolution (mm)}\times 10^{3}\bigr)}{\log_{10}\!\bigl(\text{Point Density (points m}^{-2})\bigr)}\times 5,
$$

where a lower value signals finer, better-balanced data.  The two driving parameters are themselves fundamental: scan resolution indicates the smallest feature distinguishable in millimetres, and point density expresses how many points fall on each square metre of surface.  Sub-millimetre resolutions (for example 0.5 mm) enable the study of tool-marks, while densities above 10 000 points m-² reveal surface textures in exceptional detail.

Coverage matters as much as sharpness.  **Scan Coverage Effectiveness (SCE)** folds two spatial measures—coverage percentage and overlap percentage—into one figure:

$$
\text{SCE}=C\!\times\!\Bigl(1+\frac{L}{100}\bigl(1-\frac{C}{100}\bigr)\Bigr),
$$

with $C$ the proportion of the target that is actually scanned and $L$ the fractional overlap between successive passes.  Adequate overlap can rescue otherwise patchy coverage; SCE rewards that synergy.

Three core indicators—resolution (via SRI), coverage (via SCE) and noise—merge in the **Scan Quality Score (SQS)**:

$$
\text{SQS}= \bigl(\tfrac{10}{\text{SRI}}\bigr)^{1.5} 
           \times \Bigl(\tfrac{\text{SCE}}{100}\Bigr)
           \times \Bigl(1-\tfrac{\text{Noise (dB)}}{30}\Bigr)^{2}.
$$

Because SQS scales resolution exponentially, gains in sharpness can dominate the overall grade, provided they are not undermined by noise.

Building on these metrics, several domain definitions follow:

* A **High-Resolution Scan** achieves a physical resolution of 1.0 mm or finer while sustaining at least 1 000 points m-².
* **Comprehensive Coverage** demands $C\ge 95\%$ and $L\ge 30\%$.
* A **Premium Quality Scan** satisfies both criteria above and yields an SQS greater than 7.5, making it suitable for conservation planning and publication.

Time efficiency is tracked by the **Scan Time Efficiency (STE)** indicator,

$$
\text{STE}= \frac{\text{SQS}\times\sqrt{C}}{\text{Scan Duration (min)}\times\sqrt{\text{Number of Passes}}},
$$

while environmental influence is isolated in the **Environmental Impact Factor (EIF)**,

$$
\text{EIF}= \frac{\text{SQS}}{\text{ESI}+10}\times 100,
$$

where ESI is the Environmental Suitability Index described later.

For sites with large footprints we compare total points to footprint area through the **Spatial Density Index (SDI)**,

$$
\text{SDI}= \frac{\text{Total Points}}
                 {\text{Surface Area (m}^{2})\times 10^{4}}
            \times\Bigl(\frac{\text{Point Density}}{\text{Density Code}}\Bigr)^{1/2}.
$$

Locations with $\text{Area}>100\,\text{m}^{2}$ and $\text{SDI}>50$ fall under the category of **Spatially Complex Sites**, which require multi-station strategies.

---

### 2.  Mesh and Texture Fidelity

Once point clouds are meshed, geometric detail is gauged by the **Mesh Complexity Ratio (MCR)**:

$$
\text{MCR}= \frac{\text{Face Count}}
                 {\text{Vertex Count}\times\text{(Mesh Resolution mm)}^{2}}\times10^{3}.
$$

Textural richness is captured by the \*\*Texture Density Index (TDI)}:

$$
\text{TDI}= \frac{\text{Texture Pixels}}
                 {\sqrt{\text{Face Count}}\times\text{Mesh Resolution mm}}\times10^{-2}.
$$

These two combine with geometric accuracy in millimetres ($\Delta_\text{geom}$) to form the **Model Fidelity Score (MFS)**,

$$
\text{MFS}= \text{MCR}\times\Bigl(\tfrac{\text{TDI}}{10}\Bigr)
             \times\bigl(1+e^{-\Delta_\text{geom}}\bigr).
$$

A mesh is classified as a **High-Fidelity Mesh** when
MCR > 5.0, the underlying resolution is under 1 mm, and geometric deviation is below 0.5 mm.

Down-stream performance questions are answered by the **Mesh-to-Point Ratio (MPR)**,

$$
\text{MPR}= \frac{\text{Vertex Count}}{\text{Total Points}}\times 100
            \times\Bigl(\frac{\text{MCR}}{10}\Bigr)^{0.3},
$$

where values near 25–30 % mark an optimal balance between detail and data economy.
Models exceeding two million faces yet showing MPR below 15 are flagged as **Resource-Intensive Models** that call for hardware acceleration or level-of-detail schemes.

Finally, mesh presence is summarised by the **Mesh Quality Classification**:

* *Has High-Fidelity Meshes*,
* *Standard Mesh Quality*, or
* *No Mesh Data*.

---

### 3.  Environmental Conditions

The **Environmental Suitability Index (ESI)** quantifies how friendly the surroundings were at the moment of capture:

$$
\text{ESI}= 100 - 2.5\,\lvert T-20\rvert
            -\Bigl|\tfrac{H-50}{2}\Bigr|^{1.5}
            -\frac{600}{L+100},
$$

where $T$ is ambient temperature (°C), $H$ relative humidity (%), and $L$ illuminance (lux).  Temperate weather, mid-range humidity and bright light all drive ESI upwards.
Conditions with ESI above 85 are deemed **Optimal Scanning Conditions**.  A four-tier **Environmental Condition Classification System** distinguishes *Optimal*, *Good* (70–85), *Acceptable* (50–70) and *Challenging* (< 50) sessions.

If scanning succeeds under unfavourable circumstances to the point that EIF rises above 120, the dataset earns the label **Environmental-Challenge Scan**, acknowledging the operator’s skill and adaptive methodology.

---

### 4.  Processing Performance

Back in the lab, efficiency is scrutinised with the **Processing Efficiency Ratio (PER)**,

$$
\text{PER}= \frac{\text{File Size (GB)}\times \log_{10}(\text{Total Points})}
                 {\text{Processing Hours}\times \frac{\text{CPU Usage}+ \text{GPU Usage}}{200}},
$$

and also by the **Processing Resource Utilization (PRU)**,

$$
\text{PRU}= \frac{\text{Processing Hours}\times(\text{CPU}+ \text{GPU})/2}
                 {\text{File Size (GB)}\times 10\times \log_{10}(\text{Vertex Count}+10^{4})}.
$$

Workflows with PRU under 5.0 and MFS above 7.0 achieve the status **Processing Optimized Workflow**.
We further classify every job through the **Workflow Efficiency Classification**: *Optimized* (PRU < 5), *Acceptable* (5–10) and *Needs Optimization* (> 10).
Whenever PER slips below 0.5 the record is tagged **Processing Bottleneck**, pointing to hardware or configuration limitations.

---

### 5.  Registration Accuracy

Alignment integrity is expressed by the **Registration Accuracy Ratio (RAR)**:

$$
\text{RAR}= \frac{\text{Scan Resolution (mm)}}
                 {\text{Registration Accuracy (mm)}
                 \,\sqrt{1+\tfrac{\text{Registration Error (mm)}}{\text{Registration Accuracy (mm)}}}}.
$$

Pairs where the accuracy surpasses resolution (RAR > 1) are desirable.
A log accuracy below 1 mm and total error under 2 mm fulfil the **Registration Quality Threshold**.
Confidence then follows a three-level scheme:

* *High Confidence* (RAR > 1.5 and a target-based method),
* *Medium Confidence* (1.0–1.5),
* *Low Confidence* (< 1.0).

---

### 6.  Documentation Completeness and Preservation Value

Point-by-point quality rolls up into project-level completeness.
The **Archaeological Documentation Completeness (ADC)** score blends scan quality, model fidelity and coverage:

$$
\text{ADC}= 0.4\,\text{SQS} + 0.4\,\text{MFS} + 0.2\,\text{SCE}
            - 5\sqrt{\frac{\text{Noise (dB)}}{10}}.
$$

ADC feeds into the **Digital Preservation Quality (DPQ)** metric,

$$
\text{DPQ}= 0.3\,\text{ADC}+0.3\,\text{MFS}+0.2\,\text{RAR}+0.2\,\text{SCE}
            - 2\,\sqrt{\frac{\text{Registration Error (mm)}}{\text{Scan Resolution (mm)}}}.
$$

A site that hosts Premium Quality Scans, at least one High-Fidelity Mesh, meets the Registration Quality Threshold, and whose ADC exceeds 85 constitutes a **Full Archaeological Digital Twin** ready for scholarship, conservation and virtual presentation.

Complex undertakings sometimes require phased campaigns: if individual scans fall below ADC 70 yet their combined DPQ exceeds 80, the effort is classified as a **Multi-Phase Documentation Project**.

---

### 7.  Conservation Priority and Risk

Field conditions and structural condition dictate urgency.
The **Degradation Risk Zone** flag is raised when preservation status is *Poor* or *Critical* and structural state is not *Stable*.  For such cases, the **Conservation Priority Index (CPI)** quantifies urgency:

$$
\text{CPI}= 
\begin{cases}
100-P_{\!s}+A\bigl(1+\tfrac{T}{10}\bigr), & \text{if in a Degradation Risk Zone} \\
50-P_{\!s}+A\bigl(1+\tfrac{T}{20}\bigr),  & \text{otherwise}\!,
\end{cases}
$$

where $P_{\!s}$ scores condition (Excellent = 10 through Critical = 90),
$A$ is age in millennia (from estimated dating), and $T$ measures site rarity on a 0–10 scale.
Values above 75 coupled with risk-zone status trigger a **Conservation Emergency**; values over 60 for sites datable earlier than 500 CE mark a **High Temporal Value Site**.

By policy, **Digital Conservation Priority** is highest when a Degradation Risk Zone overlaps extreme antiquity or unique site typology, prompting immediate Premium Quality scanning.

A simpler two-slot **Risk Zone Category** summarises whether a site is or is not in a Degradation Risk Zone.

---

### 8.  Equipment Effectiveness

To judge hardware usage we calculate the **Equipment Effectiveness Ratio (EER)**:

$$
\text{EER}= \frac{\text{SQS}\times S_{\!e}}{\text{Battery Level}
                 \times\bigl(101-\text{Age (days)}\bigr)/365}\times 25,
$$

where $S_{\!e}$ converts condition labels (*Excellent* = 1.0 down to *Poor* = 0.2).
EER below 30 despite favourable ESI (> 80) indicates an **Equipment Optimization Opportunity**, suggesting calibration or parameter refinements could raise quality.

---

### 9.  Feature Extraction

Efficiency of interpretation is gauged by the **Feature Extraction Efficiency (FEE)**,

$$
\text{FEE}= \frac{\text{Features}+ \text{Artifacts}}
                 {\text{PCDR}\times\sqrt{\text{Density Code}}}\times 10^{3},
$$

with PCDR the **Point Cloud Density Ratio**,

$$
\text{PCDR}= \frac{\text{Total Points}}
                  {\text{Density Code}\times\text{Surface Area (m}^{2})}.
$$

Where surface patterns are crucial, any find whose texture analysis is tagged *Detailed* or *Critical* and whose TDI exceeds 8.0 becomes a **Texture-Critical Artifact** and may call for multispectral imaging or photometric stereo.

---

### 10.  Integrated Classifications

Combining the foregoing metrics enables higher-order decision making:

* **Premium Quality Scan** and **Full Archaeological Digital Twin** designate data sets already fit for research and long-term stewardship.
* **Processing Optimized Workflow** and **Workflow Efficiency Classification** direct attention to computational performance.
* **Risk Zone Category**, **Conservation Emergency** and **High Temporal Value Site** focus conservation resources.
* **Environmental Condition Classification System** schedules fieldwork.
* **Mesh Quality Classification**, **Resource-Intensive Model** and **Spatially Complex Site** influence post-processing and visualisation strategy.
* **Registration Confidence Level** governs downstream spatial analysis.

Together, these interlocking measures provide a rigorous, quantitative framework for acquiring, processing and safeguarding digital records of the archaeological record, ensuring that each scan contributes effectively to scholarship and conservation.
