import emailjs from '@emailjs/browser'
import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { AlertToast } from '../components/alert-toast'
import { Section } from '../components/section'
import { site } from '../data/site'

const LazyParticles = lazy(async () => {
  const m = await import('../components/particles')
  return { default: m.Particles }
})

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_wqaqblr'
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_jiyk3x1'
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'JUgKs-Z9Rviu3nrPw'

function ParticlesWhenVisible(props: {
  className?: string
  quantity: number
  ease: number
  color: string
  refresh?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true)
          io.disconnect()
        }
      },
      { rootMargin: '160px', threshold: 0 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className={`pointer-events-none ${props.className ?? ''}`} aria-hidden>
      {show ? (
        <Suspense fallback={null}>
          <LazyParticles
            className="size-full min-h-full"
            quantity={props.quantity}
            ease={props.ease}
            color={props.color}
            refresh={props.refresh}
          />
        </Suspense>
      ) : null}
    </div>
  )
}

export function ContactSection() {
  const { contact } = site
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertType, setAlertType] = useState<'success' | 'danger'>('success')
  const [alertMessage, setAlertMessage] = useState('')

  const showAlertMessage = (type: 'success' | 'danger', message: string) => {
    setAlertType(type)
    setAlertMessage(message)
    setShowAlert(true)
    setTimeout(() => setShowAlert(false), 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          to_name: contact.emailTemplate.toName,
          from_email: formData.email,
          to_email: contact.emailTemplate.toEmail,
          message: formData.message,
        },
        publicKey,
      )
      setFormData({ name: '', email: '', message: '' })
      showAlertMessage('success', contact.alerts.success)
    } catch {
      showAlertMessage('danger', contact.alerts.error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Section id="contact" className="relative flex items-center">
      <ParticlesWhenVisible
        className="absolute inset-0 -z-50"
        quantity={contact.particles.quantity}
        ease={contact.particles.ease}
        color={contact.particles.color}
        refresh
      />
      {showAlert && <AlertToast type={alertType} text={alertMessage} badges={contact.alertBadges} />}
      <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-primary p-5">
        <div className="mb-10 flex w-full flex-col items-start gap-5">
          <h2 className="text-heading">{contact.sectionTitle}</h2>
          <p className="font-normal text-neutral-400">{contact.description}</p>
        </div>
        <form className="w-full" onSubmit={(e) => void handleSubmit(e)}>
          <div className="mb-5">
            <label htmlFor="name" className="field-label">
              {contact.fields.fullName}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="field-input field-input-focus"
              placeholder={contact.placeholders.fullName}
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="field-label">
              {contact.fields.email}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="field-input field-input-focus"
              placeholder={contact.placeholders.email}
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="message" className="field-label">
              {contact.fields.message}
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="field-input field-input-focus"
              placeholder={contact.placeholders.message}
              autoComplete="off"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full cursor-pointer rounded-md bg-gradient-to-r from-lavender to-royal px-1 py-3 text-center text-lg hover-animation disabled:opacity-60"
          >
            {isLoading ? contact.submitting : contact.submit}
          </button>
        </form>
      </div>
    </Section>
  )
}
