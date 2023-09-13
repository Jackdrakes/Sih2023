import { SettingsNav } from "@/components/SettingsNav";


const SettingsLayout = ({
    children
}:{
    children: React.ReactNode
}) => {
    return (
        <div className="h-full">      
            <div className="flex relative pt-15">
                <SettingsNav />
            </div>
            {children}
        </div>
    );
}
 
export default SettingsLayout;