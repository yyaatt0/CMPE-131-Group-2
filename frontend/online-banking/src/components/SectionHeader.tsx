import '../styles.css'

interface SectionHeaderProps {
    text: string;
}

function SectionHeader({text}: SectionHeaderProps) {
    return(
        <h1 className="section-header">{text}</h1>
    );
}

export default SectionHeader;