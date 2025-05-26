import React, { useRef } from "react";
import emailjs from "emailjs-com";
import Swal from 'sweetalert2';


const ContactoForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      "service_n2soos1",
      "template_wgp7arm",
      form.current,
      "55kIaKUJsisR8Gesh"
    ).then(
      (result) => {
        Swal.fire({
          icon: 'success',
          title: 'Mensaje enviado',
          text: 'Gracias por contactarnos. Te responderemos pronto.',
          confirmButtonColor: '#4a2d1f'
        });
        form.current.reset();
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al enviar el mensaje. Intenta más tarde.',
          confirmButtonColor: '#4a2d1f'
        });
      }
    );
  };

  return (
    <div className="bg-[#fdf2d0] min-h-screen flex items-center justify-center p-4">
      <div className="bg-[#fdf2d0] border-2 border-[#b7893f] rounded-xl shadow-md w-full max-w-xl p-8">
        <h2 className="text-center text-2xl font-bold text-[#5d3a1a] mb-6">Contáctanos</h2>
        <form ref={form} onSubmit={sendEmail} className="space-y-4">
          <div>
            <label className="block text-[#5d3a1a] font-semibold mb-1">Nombre:</label>
            <input type="text" name="nombre" required className="w-full p-2 border border-[#b7893f] rounded bg-[#fffaf0]" />
          </div>
          <div>
            <label className="block text-[#5d3a1a] font-semibold mb-1">Teléfono:</label>
            <input type="tel" name="telefono" className="w-full p-2 border border-[#b7893f] rounded bg-[#fffaf0]" />
          </div>
          <div>
            <label className="block text-[#5d3a1a] font-semibold mb-1">Email:</label>
            <input type="email" name="email" required className="w-full p-2 border border-[#b7893f] rounded bg-[#fffaf0]" />
          </div>
          <div>
            <label className="block text-[#5d3a1a] font-semibold mb-1">Mensaje:</label>
            <textarea name="mensaje" rows="4" required className="w-full p-2 border border-[#b7893f] rounded bg-[#fffaf0]"></textarea>
          </div>
          <button type="submit" className="w-full bg-[#4a2d1f] text-white font-semibold py-2 px-4 rounded hover:bg-[#6b3e2e] transition">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactoForm;
