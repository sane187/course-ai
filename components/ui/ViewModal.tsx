type ViewModalProps = {
  title: string
  description: string
  content: string
  onClose?: () => void
}

const ViewModal: React.FC<ViewModalProps> = ({
  title,
  description,
  content,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg">

     <div className="flex justify-between items-center">
     <div>
        <h4 className="text-lg font-semibold text-black-text" style={{color:'#0f172a'}}>{title}</h4>
        <h5 className="mt-1 text-sm text-gray-600">{description}</h5>
   </div>
         <button
          onClick={onClose}
          className="text-xl font-bold cursor-pointer text-black"
        >
          ✕
        </button>
  </div>

        <p className="mt-4 text-sm leading-relaxed text-gray-900">{content}</p>
      </div>
    </div>
  )
}

export default ViewModal
