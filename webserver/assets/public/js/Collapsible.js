
class Collapsible {
    constructor(baseurl, course, container) {
        if(course instanceof Course && container instanceof HTMLElement) {
            this.baseurl = baseurl
            this.course = course
            this.container = container
        }
        else {
            throw "Invalid constructor parameters"
        }
    }

    async create() {
        await this.fetch()
        await this.display()
    }

    async fetch() {
        try {
            this.sql_data = new SQLData(await ((await fetch(`${this.baseurl}/api/table/all/${this.course.dept}/${this.course.catalog_number}`)).json()))
        }
        catch(err) {
            //
        }
    }

    // var coll = document.getElementsByClassName("collapsible");
    // var i;
    
    // for (i = 0; i < coll.length; i++) {
    //   coll[i].addEventListener("click", function() {
    //     this.classList.toggle("active");
    //     var content = this.nextElementSibling;
    //     if (content.style.maxHeight){
    //       content.style.maxHeight = null;
    //     } else {
    //       content.style.maxHeight = content.scrollHeight + "px";
    //     } 
    //   });

    async createCollapsible(visuals) {
        let button = document.createElement('button')
        button.setAttribute('class', 'zcollapsible')
        button.innerText = `${this.course.dept} ${this.course.catalog_number}`
        this.container.appendChild(button)

        let content = document.createElement('div')
        content.setAttribute('class', 'zcollapsible-content')
        this.container.appendChild(content)

        button.addEventListener('click', () => {
            button.classList.toggle('active')
            if(content.style.maxHeight) {
                content.style.maxHeight = null;
            }
            else {
                content.style.maxHeight = `${content.scrollHeight}px`
            }
        })

        for(let viz of visuals) {
            if(viz instanceof Displayable) {
                let box = document.createElement('div')
                if(viz instanceof Chart) {
                    box.setAttribute('x-cougargrades-chart', true)
                }
                else if(viz instanceof Table) {
                    box.setAttribute('x-cougargrades-table', true)
                }
                content.appendChild(box)
                viz.setElement(box)
            }
            else {
                throw "Invalid parameters"
            }
        }
    }

    async display() {
        console.log('display')
        let visuals = [new Chart(this.baseurl, this.sql_data), new Table(this.baseurl, this.sql_data)] // each collapsible has multiple visuals (chart, table, etc)
        await this.createCollapsible(visuals)
        for(let i in visuals) {
            await visuals[i].process()
            window.addEventListener('resize', () => {
                console.log('resize?')
                visuals[i].display()
            })
        }
    }
}