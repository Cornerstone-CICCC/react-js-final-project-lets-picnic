'use client'

import emailjs from '@emailjs/browser'
import { FormEvent, useRef } from 'react'
import toast from 'react-hot-toast'


const Contact = () => {

  const formRef = useRef<HTMLFormElement>(null)


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formRef.current) return;

    try {
      await emailjs.sendForm('service_53bu84b', 'template_m600t96', formRef.current, 'nTWPDs-UosTwE2uZH')
      toast.success('message sent successfully')
      formRef.current.reset()
    } catch(err) {
      console.log(err)
      toast.error('failed to send message')
    }
  }
  
  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen">
      <div className="bg-white dark:bg-neutral-800 p-8 w-4/5 md:w-2/4 mt-22 mb-20">
        <h1 className="text-center text-2xl mb-4">Contact</h1>
        <form onSubmit={handleSubmit} ref={formRef} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" placeholder="Enter your username..." className="border p-3 rounded bg-white dark:bg-neutral-700 dark:border-neutral-600 text-black dark:text-white" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder="Enter your email..."  className="border p-3 rounded bg-white dark:bg-neutral-700 dark:border-neutral-600 text-black dark:text-white"/>
          </div>
          <div className="flex flex-col">
            <label htmlFor="message">Message</label>
            <textarea name="message" id="message" placeholder="Enter message..." className="border p-3 rounded bg-white dark:bg-neutral-700 dark:border-neutral-600 text-black dark:text-white min-h-[240px]"></textarea>
          </div>
          <button className="bg-black text-white p-3 text-sm uppercase hover:bg-gray-900/80 transition">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Contact