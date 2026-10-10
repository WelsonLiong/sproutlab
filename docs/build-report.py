from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
from xml.sax.saxutils import escape

ROOT=Path(__file__).resolve().parent.parent
OUT=ROOT/'submission';OUT.mkdir(exist_ok=True)
pdfmetrics.registerFont(TTFont('Arial','C:/Windows/Fonts/arial.ttf'))
pdfmetrics.registerFont(TTFont('Arial-Bold','C:/Windows/Fonts/arialbd.ttf'))
pdfmetrics.registerFontFamily('Arial',normal='Arial',bold='Arial-Bold',italic='Arial',boldItalic='Arial-Bold')
body=ParagraphStyle('Body',fontName='Arial',fontSize=11,leading=16.5,textColor=HexColor('#183e31'),spaceAfter=10)
c=canvas.Canvas(str(OUT/'Sprout-Lab-EDUP3133-Documentation-DRAFT.pdf'),pagesize=A4)
c.setTitle('Sprout Lab EDUP3133 Task 3 Documentation Draft')
c.setAuthor('Student author details pending')
W,H=A4;y=0;page=0
def start(title):
 global y,page
 if page:c.showPage()
 page+=1;y=H-65
 c.setFillColor(HexColor('#176349'));c.rect(45,H-38,W-90,4,fill=1,stroke=0)
 c.setFont('Arial',9);c.drawString(45,H-52,'EDUP3133  |  TASK 3  |  WORKING DOCUMENTATION')
 c.setFont('Arial-Bold',19);c.drawString(45,y-20,title);y-=49
 c.setFont('Arial',9);c.setFillColor(HexColor('#506b5e'));c.drawString(45,29,'Sprout Lab  |  Draft pending student details and adult usability evidence')
 c.drawRightString(W-45,29,f'{page} / 7')
def p(s):
 global y
 block=Paragraph(s,body);_,h=block.wrap(W-90,800)
 if y-h<52:raise RuntimeError(f'Page {page} overflow: {s[:40]}')
 block.drawOn(c,45,y-h);y-=h+10
def heading(s):
 global y
 y-=8;c.setFillColor(HexColor('#176349'));c.setFont('Arial-Bold',12);c.drawString(45,y-12,s);y-=26
def line(label):p(f'<b>{label}:</b> __________________________________________')

start('Sprout Lab product documentation')
p('<b>Photosynthesis and responsible AI use for Year 4 pupils</b>')
p('This 19-minute English learning module combines an illustrated learning trail, guided explanation, a manipulable leaf model, two water-routing puzzles, an AI evidence investigation, a five-item assessment and reflection. It is prepared for the Science Pendidikan Rendah option in PISMP, EDUP3133 Teknologi untuk Pengajaran dan Pembelajaran.')
p('<b>Draft status:</b> the working website and supporting materials are prepared. This document does not claim that two adult usability tests have occurred. Complete the real test evidence, student declaration and official cover before submission.')
heading('Official submission details to complete privately')
for label in ['Student name','Candidate number','Identity card number','Group / unit','Lecturer','Marks']:line(label)
p('<b>Course:</b> EDUP3133 Teknologi untuk Pengajaran dan Pembelajaran<br/><b>Task:</b> Tugasan 3 Penghasilan Produk (50%)<br/><b>Submission deadline in supplied TPB:</b> 6 November 2026<br/><b>Draft updated:</b> 11 October 2026')
p('Use the latest official front-cover template specified by the lecturer. The lines above are completion aids, not a replacement for that template. Never put identity card or candidate details on the pupil website.')

start('Product context and learning outcomes')
p('<b>Audience and context.</b> Year 4 primary pupils, approximately 10 years old, learning Unit 4 Plants in English. They are expected to know that plants are living things and need water. A teacher may facilitate partner talk, narration and the offline version where language or device access is a barrier.')
p('<b>Case context.</b> A simulated AI helper confidently claims that roots obtain ready-made food from soil and that water alone is sufficient. Pupils collect science evidence before repairing the claim. This translates the assignment emphasis on safe, ethical, inclusive and meaningful AI literacy into a child-sized problem.')
heading('Measurable outcomes')
for s in ['Explain photosynthesis as the process by which green plants make their own food.','Identify all four needs: sunlight, water, carbon dioxide and chlorophyll; identify glucose and oxygen as products.','Predict and compare a model trial with all needs present and a trial with one need removed.','Explain at least one benefit of photosynthesis to other living things.','Use two evidence sources to repair the AI claim, and correctly remove three private details from a simulated message.']:
 p('• '+s)
p('<b>Evidence and success criteria.</b> Use the experiment log, game completion, claim repair, privacy exercise and final explanation alongside the assessment. A score of at least 4/5 indicates the lesson target, with review and retry available. Progress badges record completed activities; they are not formal classroom mastery levels.')
p('<b>Curriculum reference.</b> Content follows the supplied <i>Science Year 4</i> (Ministry of Education Malaysia, 2019), printed pp. 76–81, where learning-standard markers 4.2.1–4.2.5 appear. The supplied DSKP PDF is labelled Year 2, so it was not treated as Year 4 authority.')

start('Instructional sequence and rationale')
p('<b>Instructional model:</b> Gagné\'s Nine Events of Instruction. <b>Integration model:</b> TPACK. Science knowledge determines the content; prediction, enquiry, feedback and reflection determine pedagogy; the model, puzzles, audio and local journal provide the technology.')
for h,s in [
('Induction 2 minutes','The plant mystery gains attention, introduces the goals and recalls pupils\' ideas about food. A low-stakes prediction makes prior understanding visible.'),
('Explanation 3 minutes','Choose the cartoon plus guided playable leaf factory, or the original picture notes. Demonstration precedes independent operation: send water, admit carbon dioxide, uncover sunlight and follow both products. These are alternatives within the same stop.'),
('Exploration 3 minutes','Pupils predict, change one condition and test the leaf model. The log shows contrasting results. Explanations connect the outcome to the missing need.'),
('Application 3 minutes','Two water-routing puzzles elicit performance. Rotating channels, observing a blocked route and retrying form a real spatial puzzle. Water reaches roots; it is never described as food.'),
('AI investigation 3 minutes','Pupils open illustrated textbook and NASA clues, rebuild a sentence with word tiles and shield fictional private details, one mission at a time. The task connects science understanding to responsible sharing.'),
('Assessment 3 minutes','Five questions assess meaning, needs, products, importance and checking AI. Every response receives specific explanation; the results link back to relevant learning and allow retry.'),
('Closure 2 minutes','A written or spoken reflection supports retention. An adult-supported outdoor observation prompt encourages transfer without damaging plants.')]:
 heading(h);p(s)
p('The total of 19 minutes is a design estimate. Measure actual completion time with adults and refine it before classroom use. No countdown penalises slower readers.')

start('Multimedia accessibility and CASPER')
p('<b>Text and graphics:</b> concise English directions, cartoon characters, an illustrated garden map, a labelled plant scene and consistent icons establish a welcoming learning environment. The map is working navigation rather than a promotional page.')
p('<b>Animation and audio:</b> a 36-second cartoon leads into a 49-second demonstration, then pupil operation. Captions, pause, replay and optional device narration support the sequence. Water, gas, light and products animate in place. A missing voice never blocks learning.')
p('<b>Multimedia rationale:</b> relevant labels sit near diagram elements (spatial contiguity); content is sequenced into demonstration and practice (segmenting); arrows and active states direct attention (signalling). No automatic background music or external video distracts from the science. The full text remains available without audio (Mayer, 2021).')
heading('CASPER in the interface')
p('<b>Contrast:</b> dark fern text on light cream or pastel surfaces; visible focus outlines.<br/><b>Alignment:</b> common content edges and aligned controls.<br/><b>Simplicity:</b> one main task per station, brief instructions and clear retry actions.<br/><b>Proximity:</b> source evidence, controls and feedback are grouped with their tasks.<br/><b>Emphasis:</b> a current map stop and a clear primary action.<br/><b>Repetition:</b> consistent navigation, icons, buttons and lesson endings.')
heading('Inclusion and access')
p('Keyboard and touch operation, optional larger text, reduced motion, low-data artwork setting, transcripts, a saved experiment log and a printable offline trail support varied needs. Pupils may speak their reflection instead of typing. Pair work and teacher read-aloud remain available.')
p('The app has no pupil login. Progress and reflection are kept in the current browser; a downloadable journal supports shared-device use. Pupils can clear their own data in Settings. Browser speech and hosted access are environment-dependent. Low-data mode hides art; the printable trail is the reliable disconnected alternative.')

start('AI domains ethics and asset record')
p('<b>Pengajaran dan Pembelajaran:</b> pupils evaluate a teacher-selected simulated AI response, cross-check two sources and repair a science claim. <b>Etika AI:</b> they practise privacy, source credit, acknowledging AI assistance and adult-guided use. These are two of the domains in KPM\'s 2026 AI-literacy framework.')
p('The TPB permits simulation instead of direct pupil AI use. No live AI chat, pupil account, uploads or AI API calls are included. Gamification is the contemporary technology: spatial puzzles, progress feedback and discoveries serve learning goals rather than competition or time pressure.')
heading('AI and media production log')
p('<b>OpenAI Codex, 8–11 October 2026:</b> used for code, activity drafts, pedagogical mapping and this draft. Prompt requirements: English Year 4 photosynthesis, joyful interactive learning, RPH sequence, genuine games, AI-literacy evidence and deferral of the third-person game. Outputs are the source files and supporting documentation. Full prompt context remains in this chat.')
p('<b>Image generation:</b> a cartoon garden, four-character atlas and a leaf-hideout scene in landscape and portrait. Exact prompts are retained in <i>docs/world-prompt.txt</i>, <i>docs/cast-prompt.txt</i> and <i>docs/leaf-hideout-prompts.txt</i>. The plant face is fictional decoration. The leaf hideout is an imaginative model, not literal anatomy.')
p('<b>Other assets:</b> self-hosted Nunito under the SIL Open Font License, original SVG geometry, CSS animation and generated audio cues. The supplied textbook is paraphrased, not redistributed. Supplied 3D game assets remain outside this website pending a separate license review.')
p('<b>Fact checking and corrections:</b> include chlorophyll; distinguish water from food; explain starch storage; avoid implying plants respire only at night; label the model and timing assumptions. Science was checked against the supplied textbook and NASA. Student/lecturer review remains required.')
p('<b>Source limitation:</b> the official KPM guide download redirected during retrieval. The official circular page and indexed KPM guide text corroborate domain names. Verify exact subdomain language with the lecturer\'s copy before final submission. The complete implementation and asset log is in <i>docs/ai-asset-log.md</i>.')

start('Usability evidence and improvement plan')
p('<b>Required evidence still pending.</b> At least two real adults must test the module. AI-agent and technical checks do not meet this requirement. No names, quotations, satisfaction scores or adult observations have been invented.')
p('Give each adult the learning goal and a fresh session. Ask them to start from the map, make a prediction, try both explanation modes, run two contrasting model trials, solve both puzzles, correct the AI claim, complete the privacy task, retry the assessment, save a reflection and reopen the journal.')
p('Record the date, device/browser, actual duration and whether each task was completed independently, with help or not completed. Observe confusing instructions, science misconceptions, missed navigation, touch targets, keyboard access and readability. Ask what was enjoyable, unclear and difficult. Use anonymous Tester A/B labels in the report.')
heading('Tester A record')
for s in ['Date / device / adult role','Observed difficulty and task','Suggested improvement']:line(s)
heading('Tester B record')
for s in ['Date / device / adult role','Observed difficulty and task','Suggested improvement']:line(s)
heading('Improvement and retest record')
for s in ['Finding and priority','Change made and location','Retest result and evidence']:line(s)
p('The editable test protocol is in <i>docs/usability-test.md</i>. Replace these pending lines with genuine evidence and resulting changes before submission. Keep screenshots free of personal or sensitive information.')

start('References and submission checklist')
for s in [
'Institut Pendidikan Guru Kampus Kent. (2026). <i>Tugasan pentaksiran berterusan EDUP3133: Ogos 2026–Disember 2026</i> [Course assessment brief]. User-supplied PDF.',
'Institut Pendidikan Guru Malaysia. (2026). <i>EDUP3133 Teknologi untuk Pengajaran dan Pembelajaran</i> [Student course information, updated July 2026]. User-supplied PDF.',
'Kementerian Pendidikan Malaysia. (2026). <i>Panduan literasi kecerdasan buatan (AI)</i>. https://www.moe.gov.my/surat-pekeliling-ikhtisas-kpm-ai',
'Mayer, R. E. (2021). <i>Multimedia learning</i> (3rd ed.). Cambridge University Press.',
'Ministry of Education Malaysia. (2019). <i>Science Year 4</i> (Dual Language Programme). Dewan Bahasa dan Pustaka.',
'NASA Science. (n.d.). <i>What is the carbon cycle?</i> https://science.nasa.gov/kids/earth/what-is-the-carbon-cycle/',
'NASA. (n.d.). <i>STEMonstrations: Photosynthesis</i>. https://www.nasa.gov/stem-content/stemonstrations-photosynthesis/'
]:p(s)
heading('Before submitting')
p('1. Add the official cover and complete personal details privately.<br/>2. Confirm lecturer approval of this custom website platform.<br/>3. Insert genuine evidence from two adult tests and implemented improvements.<br/>4. Review the AI declaration and acknowledge all assistance.<br/>5. Provide the working access URL and source backup; ensure the lecturer can access the chosen audience.<br/>6. Recheck the final PDF length (5–8 pages), Arial 11, 1.5 spacing and APA 7 references after editing.')
p('<b>Access record:</b> the verified publication URL is recorded separately in <i>submission/ACCESS.txt</i> after deployment. New Sites are private by default; access must be arranged before the lecturer or pupils can use the hosted version. A local source backup and printable trail are also supplied.')
c.save()
print(OUT/'Sprout-Lab-EDUP3133-Documentation-DRAFT.pdf')
