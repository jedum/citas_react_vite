import { useState, useEffect } from "react";
import Error from "./Error";

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);

  useEffect(() => {

    if(Object.keys(paciente).length > 0){
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)

    }
  }, [paciente]);

  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36)
    return random + fecha
  }

  const handleSubmit = (e)  => {
    e.preventDefault()

    // Validación de campos
    if([nombre, propietario, email, fecha, sintomas].includes('')){
      setError(true)
      return
    }
    setError(false)

    // Objeto de Pacientes
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas,
    }
    if(paciente.id){
      // Editar Registro
      objetoPaciente.id = paciente.id
      const pacientesActualizados = pacientes.map( pacienteState => 
        pacienteState.id === paciente.id ? objetoPaciente : pacienteState
        )      
        setPacientes(pacientesActualizados)
        setPaciente({})
      
    }else{
      // Nuevo Registro
      objetoPaciente.id = generarId()
      setPacientes( [...pacientes, objetoPaciente] )
    }

    // Reiniciar el formulario
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
    
  }
  return (
    <div className="md:w-1/2 lg:w-2/5">
      <h2 className="font-black text-3xl text-center">
        Seguimiento de Pacientes
      </h2>
      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y{" "}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>
      <form className="bg-white shadow-md rounded-lg py-10 px-5 mb-10 mx-5" onSubmit={ handleSubmit }>
      { error &&  <Error>Todo los campos son obligatorios</Error>}
        <div className="mb-5">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="mascota"
          >
            Nombre Mascota
          </label>
          <input
            id="mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            type="text"
            placeholder="Nombre de la mascota"
            value={ nombre }
            onChange= { (e) => setNombre(e.target.value) }
          />
        </div>
        <div className="mb-5">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="propietario"
          >
            Nombre Propietario
          </label>
          <input
            id="propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            type="text"
            placeholder="Nombre de la Propietario"
            value={ propietario }
            onChange= { (e) => setPropietario(e.target.value) }
          />
        </div>
        <div className="mb-5">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            type="email"
            placeholder="Email contacto del propietario"
            value={ email }
            onChange= { (e) => setEmail(e.target.value) }
          />
        </div>
        <div className="mb-5">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="email"
          >
            Alta
          </label>
          <input
            id="email"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            type="date"
            value={ fecha }
            onChange= { (e) => setFecha(e.target.value) }
          /> 
        </div>
        <div className="mb-5">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="sintomas"
          >
            Síntomas
          </label>
          <textarea
            id="sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Describe los Síntomas"
            value={ sintomas }
            onChange= { (e) => setSintomas(e.target.value) }
          />
        </div>
        <input 
            type="submit"
            className="bg-indigo-600 w-full p-3 font-bold text-white uppercase hover:bg-indigo-700 cursor-pointer transition-colors"
            value={ paciente.id ? 'Editar paciente' : 'Agregar paciente'}/>
      </form>
    </div>
  );
};

export default Formulario;
