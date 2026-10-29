export const CONTRACTS = ['CDI', 'CDD', 'Stage', 'Freelance']

export const SORT_OPTIONS = [
  { value: 'recent', label: 'Plus récentes' },
  { value: 'salary-desc', label: 'Salaire décroissant' },
  { value: 'salary-asc', label: 'Salaire croissant' },
  { value: 'experience-asc', label: 'Expérience croissante' }
]

export const formatSalary = value =>
  `${Number(value).toLocaleString('fr-FR')} MAD`

export const formatDate = value =>
  new Date(value).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

export const formatExperience = years =>
  years === 0 ? 'Débutant accepté' : `${years} an${years > 1 ? 's' : ''} d'expérience`
