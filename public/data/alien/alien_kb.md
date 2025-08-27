# Corporate Knowledge Base Wiki

*A public-facing compendium of the analytical concepts, indices, and classifications used in our astronomical-signal research program.*

---

## 1 Observational Environment

Successful signal work begins with the sky itself.  The **Atmospheric Observability Index (AOI)** gauges how transparent and steady the air is during an observation

$$
\text{AOI}= \text{Atmospheric transparency}\times\Bigl(1-\frac{\text{Relative humidity}}{100}\Bigr)\times\Bigl(1-0.02\,\text{Wind speed (m s}^{-1})\Bigr),
$$

so values approach 1 under clear, dry, calm conditions.  A related metric—the **Atmospheric Observability Window (OOW)**—defines the truly ideal nights: AOI must exceed 0.85, the Moon should be at New or First-Quarter phase, its distance on the sky larger than 45°, and solar activity no higher than “moderate”.

The Moon itself enters explicitly through the **Lunar-Interference Factor (LIF)**,

$$
\text{LIF}= \Bigl(1-\frac{\text{Moon–target separation (°)}}{180}\Bigr)\times\bigl(1-\text{Atmospheric transparency}\bigr),
$$

where values above 0.5 warn of serious scattered moonlight.  Observations classed as *High Lunar Interference Events* fall in this regime.

Weather conditions are also described qualitatively.  “Clear” skies denote a transparency above 0.9, humidity below 40 % and winds under 3 m s⁻¹, while “Excellent” seeing means atmospheric turbulence permits sub-arcsecond resolution with winds below 2.5 m s⁻¹.

Finally, overall confidence in the night is distilled into the **Observation Quality Factor (OQF)**,

$$
\text{OQF}= \text{AOI}\times(1-\text{LIF})\times
\begin{cases}
1,&\text{if pointing accuracy}<2\text{ arcsec},\\[4pt]
\displaystyle\frac{2}{\text{pointing accuracy}},&\text{otherwise},
\end{cases}
$$

and summarised for outsiders as a three-tier **Observation-Confidence Level (OCL)**:
*High* if AOI > 0.8 and the telescope is fully operational and freshly calibrated, *Medium* for minor shortcomings, and *Low* when conditions or equipment fall below those thresholds.

Where the atmosphere conspires against us—transparency under 0.7, humidity above 70 %, winds stronger than 8 m s⁻¹, or geomagnetic storm conditions—a **Signal-Degradation Scenario (SDS)** is declared and data quality is flagged accordingly.

---

## 2 Telescope and Detector Performance

Instrument health is folded into the **Detection-Instrument Sensitivity Factor (DISF)**,

$$
\text{DISF}= \Bigl(10-\frac{|\text{Air temperature}-15|}{10}\Bigr)
          \times\text{Atmospheric transparency}
          \times\Bigl(1-\frac{\text{Relative humidity}}{200}\Bigr)
          \times\frac{100-\text{Moon–target separation (°)}}{100},
$$

with a theoretical maximum of 10.  DISF feeds straight into the OQF above.  Pointing and tracking accuracies appear in that same calculation, ensuring hardware aligns with sky quality.

---

## 3 Raw Signal Quality and Stability

Once photons reach the receivers, the first question is whether the data are *usable*.  We answer with the **Signal-to-Noise Quality Indicator (SNQI)**,

$$
\text{SNQI}= \text{Signal–to–noise ratio}\;-\;0.1\times\bigl|\text{Noise floor (dBm)}\bigr|.
$$

Any positive value denotes an *Analyzable Signal*.

Temporal and spectral steadiness is captured by the **Signal-Stability Metric (SSM)**,

$$
\text{SSM}= \Bigl(1-\frac{|\text{Frequency drift (Hz s}^{-1})|}{\text{Frequency (MHz)}\times10^{3}}\Bigr)
            \times\frac{\text{Signal duration (s)}}{1+\text{Doppler shift (Hz)}/1000},
$$

so fixed, long-lasting transmissions earn high marks.

Bandwidth matters as well.  The **Bandwidth-to-Frequency Ratio (BFR)** is

$$
\text{BFR}= \frac{\text{Bandwidth (Hz)}}{\text{Centre frequency (MHz)}\times10^{6}},
$$

and is tiny for classical narrowband beacons.

Modulation contributes through the **Modulation-Complexity Score (MCS)**,

$$
\text{MCS}= \text{Modulation index}\times\bigl(1+\text{SSM}\bigr)\times M_{\text{factor}},
$$

where $M_{\text{factor}}$ equals 2 for amplitude modulation, 1.5 for frequency modulation and 1 otherwise.

---

## 4 Information Content and Encoding

Complexity is weighed by the **Signal-Complexity Ratio (SCR)**,

$$
\text{SCR}= \frac{\text{Complexity index}\times\text{Information density}}
                 {\log\bigl(\text{Bandwidth (Hz)}\bigr)},
$$

and by the **Encoding-Complexity Index (ECI)**,

$$
\text{ECI}= \frac{\text{Compression ratio}\times\text{Complexity index}\times\text{Entropy}}{10}.
$$

When ECI exceeds 1.8 and the entropy sits between 0.3 and 0.7, the signal is flagged as an **Encoded Information Transfer (EIT)** candidate.  Values above 2.5, combined with significant quantum-mechanical effects, raise the possibility of **Quantum-Coherent Transmission**—technology beyond standard radio practice.

A complementary measure, the **Information-Entropy Ratio (IER)**,

$$
\text{IER}= \frac{\text{Entropy}}{0.9\,\text{Natural-source probability}+0.1},
$$

reveals whether randomness outstrips what nature alone can explain.

To verify that patterns truly exist, the **Pattern-Recognition Confidence (PRC)** multiplies repetition, entropy and SCR:

$$
\text{PRC}= \Bigl(\text{if repeats}>1:\;1+\log_{10}\text{repeats};\;0.5\Bigr)
            \times\bigl(\text{Entropy}<0.9?1:0.3\bigr)\times\text{SCR}.
$$

Signals that also display organised temporal-frequency structure, entropy between 0.4 and 0.8, and a modulation index above 0.5 earn the label **Coherent Information Pattern (CIP)**.

---

## 5 Origin-Likelihood Metrics

We judge artificial provenance through the **Technological-Origin Likelihood Score (TOLS)**,

$$
\text{TOLS}= \text{Technosignature probability}\times
             \bigl(1-\text{Natural-source probability}\bigr)\times
             \text{Uniqueness}\times
             \Bigl(0.5+\frac{\text{Anomaly score}}{10}\Bigr).
$$

Thresholds define a *low* category below 0.25, *medium* below 0.75, and *high* above that.

A signal meeting all of the following—

* TOLS > 0.7
* Natural-source probability < 0.3
* Artificial-source probability < 50 %
* BFR < 0.001
* Information density > 0.8

—is publicly termed a **Technosignature**.  If its confirmation-confidence (see § 7) ranks above 0.9, its modulation complexity above 1.5 and its artificial-intelligence detection probability (below) above 0.8, then it graduates to **High-Confidence Technosignature** status.

Very narrow beacons receive a specialised **Narrowband-Technological-Marker (NTM)** classification.
*Strong* NTMs have BFR < 0.0001 and frequency drift below 0.1 Hz s⁻¹;
*Moderate* NTMs relax those limits to 0.0005 and 0.5 Hz s⁻¹.

When a narrowband signal further exhibits BFR < 0.0001 together with high stability, it becomes a textbook example of the class “Narrowband”.

The **Artificial-Intelligence Detection Probability (AIDP)** combines encoding and origin factors,

$$
\text{AIDP}= \frac{\text{ECI}\times\text{TOLS}}{1+\text{Natural-source probability}}.
$$

---

## 6 Source-Location Significance

Purely celestial considerations enter via the **Celestial-Location Significance Factor (CLSF)**.  If the target is a known object, the base weight doubles; giant stars with masses close to solar receive an extra boost, and higher-than-solar metallicity also inflates the score.  These multipliers combine multiplicatively, so CLSF may exceed 2 for especially enticing systems.

Linking astrophysics to bio-interest, the **Habitable-Zone Signal Relevance (HZSR)** weights TOLS by how well the source star’s luminosity places its planet-forming region in the canonical “habitable” band.  Values above 1.5, plus technosignature traits, identify a **Habitable-Zone Transmission**.  Such discoveries sit under a wider banner, **Signal of Galactic Significance**, whenever CLSF surpasses 2, AIDP exceeds 0.7 and technosignature criteria are all met.

---

## 7 Verification and Research Workflow

Every candidate passes through a formal pipeline.  The **Confirmation-Confidence Score (CCS)** distils multiple safeguards:

$$
\text{CCS}= \bigl(1-\text{False-positive probability}\bigr)\times
            \text{Decoding confidence}\times
            \text{Classification confidence}\times
            \begin{cases}
            \tfrac{\text{SNQI}}{10}+0.5,&\text{if SNQI}>0,\\[4pt]
            0.1,&\text{otherwise}.
            \end{cases}
$$

Where SNQI itself is absent, a simplified approximation may substitute the raw signal-to-noise ratio.  Scores above 0.8 denote **High-Confidence Signals**; over 0.9 they underpin the High-Confidence Technosignature grade mentioned earlier.

Computational effort is tracked by the **Signal-Processing Efficiency Index (SPEI)**,

$$
\text{SPEI}= \frac{\text{Decoding iterations}\times\text{Processing time (h)}}
                  {\text{ECI}\times\text{Complexity index}},
$$

helping the operations team balance cluster loads.

For programme scheduling we calculate a **Research-Priority Index (RPI)**,

$$
\text{RPI}= \bigl(4\,\text{Technosignature prob.}
           +\tfrac{\text{Biosignature prob.}}{100}
           +2\,\text{Uniqueness}
           +\tfrac{\text{Anomaly score}}{2}\bigr)
           \times\bigl(1-\text{False-positive probability}\bigr),
$$

with anything above 3 considered urgent.  RPI > 3.5, technosignature probability beyond 0.8 and anomaly score above 5 together define a **Target of Opportunity**.  Should PRC exceed 0.8 and the intermediate-medium distortion factor remain below 0.5, the event is escalated to **Research-Critical Signal**.

If observations occurred under an Optimal Window (section 1), OQF exceeds 0.85 and CCS clears 0.8, we designate the record an **Observation-Verified Signal**—the closest we come to airtight certainty short of receiving an unambiguous “hello”.

---

## 8 Special Phenomena and Notable Classes

* **Fast Radio Transient (FRT)** – Blazing flashes shorter than 0.1 s, stronger than 15 dB, spanning more than 1 MHz of bandwidth and never repeating.
* **Potential Biosignature** – Signals whose biosignature probability exceeds 0.6 while technosignature probability remains under 0.4, often tied to spectral lines of pre-biotic molecules.
* **Directed Transmission** – Narrow-beam, linearly polarised, spatially stable signals with TOLS above 0.85, consistent with a transmitter aimed deliberately at our location.
* **Multi-Channel Communication Protocol** – Coherent Information Pattern reproduced on several frequencies, repeating at least four times with a steady period and ECI above 2, suggesting an advanced, possibly encrypted network.
* **Quantum-Coherent Transmission** – Information density beyond 1.5 and ECI beyond 2.5, accompanied by explicit quantum phenomena in the received waveform.  Extremely high MCS plus anomaly scores above 8 define an **Anomalous Quantum Signal**—either an unknown astrophysical process or something far more exotic.

Finally, probability values below one per cent in the false-positive field signify detections “as solid as radio astronomy can provide”: the formal criterion is *False-positive probability < 0.01*.

---

## 9 From Detection to Publication

Signals progress through the standard research stages—analysis, follow-up, peer review, publication—mirrored by our internal workflow tables.  When a candidate satisfies stringent verification (CCS > 0.8) and is observed under favourable conditions (OQF > 0.85), the corporation considers the result public-ready.  The classifications, scores and labels collected in this document serve not only to communicate discoveries to the broader community, but to guide telescope scheduling, computing allocation and human attention in real time.

---

### Abbreviations Used

SNR – signal-to-noise ratio | SSM – Signal-Stability Metric

SNQI – Signal-to-Noise Quality Indicator | BFR – Bandwidth-to-Frequency Ratio

ECI – Encoding-Complexity Index | SCR – Signal-Complexity Ratio

TOLS – Technological-Origin Likelihood Score | AOI – Atmospheric Observability Index

LIF – Lunar-Interference Factor | OQF – Observation Quality Factor

CCS – Confirmation-Confidence Score | RPI – Research-Priority Index

MCS – Modulation-Complexity Score | AIDP – Artificial-Intelligence Detection Probability

CLSF – Celestial-Location Significance Factor | HZSR – Habitable-Zone Signal Relevance

---

**End of public knowledge base.**
