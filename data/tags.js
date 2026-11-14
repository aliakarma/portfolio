// data/tags.js — the only tags a publication may use.
//
// The research graph and the topic filter are built from these tags, so two
// spellings of one idea ("Digital Twin" / "Digital Twins") would split a theme
// in two. The build fails if a paper uses a tag that is not listed here: add
// the tag below (with a colour, or null for the neutral style), then use it.
//
// Colours are full class strings because Tailwind only ships classes it can
// find written out in the source.

export const TAGS = {
  // Research directions
  'Agentic AI':        'text-violet-300 border-violet-500/25 bg-violet-900/20',
  'Trustworthy AI':    'text-emerald-300 border-emerald-500/25 bg-emerald-900/20',
  'AI V&V':            'text-lime-300 border-lime-500/25 bg-lime-900/20',
  'Secure AI':         'text-red-300 border-red-500/25 bg-red-900/20',
  'AI Safety':         'text-rose-300 border-rose-500/25 bg-rose-900/20',
  'AI Governance':     'text-teal-300 border-teal-500/25 bg-teal-900/20',

  // Methods
  'LLMs':                   'text-blue-300 border-blue-500/25 bg-blue-900/20',
  'Reinforcement Learning': 'text-indigo-300 border-indigo-500/25 bg-indigo-900/20',
  'Federated Learning':     'text-sky-300 border-sky-500/25 bg-sky-900/20',
  'Blockchain':             'text-amber-300 border-amber-500/25 bg-amber-900/20',
  'Digital Twins':          'text-cyan-300 border-cyan-500/25 bg-cyan-900/20',
  'Privacy':                'text-amber-300 border-amber-500/25 bg-amber-900/20',
  'Systematic Review':      'text-pink-300 border-pink-500/25 bg-pink-900/20',
  'Forecasting':            null,
  'Path Planning':          null,
  'Techno-Economic Modeling': null,
  'Ethics':                 null,

  // Application domains
  'Smart Cities':       'text-green-300 border-green-500/25 bg-green-900/20',
  'Assistive AI':       'text-purple-300 border-purple-500/25 bg-purple-900/20',
  'Accessibility':      'text-purple-300 border-purple-500/25 bg-purple-900/20',
  'Healthcare AI':      'text-purple-300 border-purple-500/25 bg-purple-900/20',
  'Cybersecurity':      'text-gray-300 border-gray-500/25 bg-gray-900/20',
  'IoT':                'text-gray-300 border-gray-500/25 bg-gray-900/20',
  'Disaster Response':  'text-orange-300 border-orange-500/25 bg-orange-900/20',
  'Sustainability':     'text-lime-300 border-lime-500/25 bg-lime-900/20',
  'Robotics':           null,
  'Vehicular Networks': null,
  'Supply Chain':       null,
  'Finance':            null,
  'Nutrition':          null,
  'Academic Integrity': null,
  'Water Reuse':        null,
}

const NEUTRAL = 'text-parchment-400 border-parchment-400/20 bg-parchment-400/5'

export const tagClass = (tag) => TAGS[tag] || NEUTRAL
