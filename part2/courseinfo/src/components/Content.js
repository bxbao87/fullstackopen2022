import Part from './Part'

const Content = ({content}) => {
    // console.log(content);
    return (
        content.map(part => <Part key={part.id} part={part}/>)
    )
}

export default Content