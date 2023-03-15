import React from 'react'
const styles = {
  header:"bg-indigo-600 flex pl-4 items-center fixed top-0 h-16 w-full shadow",
  title:"font-bold text-xl text-slate-50",
  subtitle:"text-slate-300"
}

function index() {
  return (
    <header className={styles.header}>
        <h1 className={styles.title+ ' mr-4'}>Spring 2</h1>
        <h2 className={styles.subtitle}>Recommendation algorithm</h2>
    </header>
  )
}

export default index