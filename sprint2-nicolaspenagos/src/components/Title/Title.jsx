import React from 'react'
const styles = {
    subtile:"text-slate-700 ml-2 text-xl",
    number:"font-bold text-xl text-indigo-600",
    titleRow:"flex mb-2 items-end"

}
function Title({number, title}) {
  return (
    <div className={styles.titleRow}>
        <h1 className={styles.number}>{number}</h1>
        <h1 className={styles.subtile}>{title}</h1>
    </div>
  )
}

export default Title;