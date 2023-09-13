const Authlayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
  return (
    <div className="flex items-center justify-center h-full pt-7">
        {children}
    </div>
  )
}

export default Authlayout