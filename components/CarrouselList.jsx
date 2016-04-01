import React, {Component} from 'react';
import {Button, ButtonGroup} from 'react-bootstrap';
import {ID_PREFIX_SECTION, ID_PREFIX_PAGE} from '../constants';
import Section from '../components/Section';

export default class CarrouselList extends Component{
    render(){
        return(
            <div style={{height: '100%'}}>
                <ButtonGroup style={{width: '100%'}}>
                    <Button className="carrouselButton" 
                            disabled={this.props.navItemSelected === 0}
                            onClick={e => {
                                        let ids = [this.props.navItemSelected];
                                        let found = this.findChildren(ids);
                                        let boxes =  this.findBoxes(found);
                                        this.props.onNavItemRemoved(ids, this.props.navItems[this.props.navItemSelected].parent, boxes );
                                    }
                                }><i className="fa fa-trash-o"></i></Button>
                    <Button className="carrouselButton" 
                            disabled={this.props.navItemSelected === 0}
                            onClick={e => {
                                        //this.props.onSectionDuplicated(this.props.sectionSelected);
                                    }
                                }><i className="fa fa-files-o"></i></Button>

                    <Button className="carrouselButton"  onClick={e => {
                                    this.props.onSectionAdded(ID_PREFIX_SECTION + Date.now(), "Section "+this.sections(), 0, [], 1, 'section', this.props.navItemsIds.length);
                                    e.stopPropagation();
                                }}><i className="fa fa-folder-o"></i></Button>
                    <Button className="carrouselButton"  onClick={e => {
                                    this.props.onPageAdded(0, true);
                                    e.stopPropagation();
                                }}><i className="fa fa-file-o"></i></Button>
                </ButtonGroup>
                <div  ref="sortableList" className="carList connectedSortables">
                    {
                    this.props.navItems[0].children.map((id, index) => {
                        if(id.indexOf(ID_PREFIX_SECTION) !== -1){
                            return <Section id={id}
                                            key={index}
                                            navItemsIds={this.props.navItemsIds}
                                            navItems={this.props.navItems}
                                            navItemSelected={this.props.navItemSelected}
                                            onPageAdded={this.props.onPageAdded}
                                            onSectionAdded={this.props.onSectionAdded}
                                            onNavItemSelected={this.props.onNavItemSelected}
                                            onNavItemExpanded={this.props.onNavItemExpanded} 
                                            onNavItemReorded={this.props.onNavItemReorded}/>;
                        }else if(id.indexOf(ID_PREFIX_PAGE) !== -1){
                            let classSelected = this.props.navItemSelected === id ? 'selected drag-handle' : 'notSelected drag-handle';
                            return <h4 key={index}
                                        className={classSelected}
                                         onMouseDown={e => {
                                                    this.props.onNavItemSelected(id);
                                                    e.stopPropagation();
                                               }}>{this.props.navItems[id].name}</h4>
                                            
                        }
                    })}
                </div>
            </div>
        )
    }

    findChildren(ids){

        //We want to get all the items whose level is higher than the selected starting after it
        let level = this.props.navItems[ids[0]].level;
        let startingIndex = this.props.navItemsIds.indexOf(ids[0]) + 1;
        for(var i = startingIndex; i < this.props.navItemsIds.length; i++){
            if(this.props.navItems[this.props.navItemsIds[i]].level > level) {
                ids.push(this.props.navItemsIds[i]);
            } else {
                break;
            }
        }
        return ids;

    }

    sections(){

        var current = 1;
        for (let i in this.props.navItemsIds){
         
            if(this.props.navItemsIds[i][0]=='s'){
                current++;
            }
        }
        return current;

    }


    findBoxes(ids){
       let newids = ids;
       var boxesids = [];
       newids.map(nav=> {

       let boxes = this.props.navItems[nav].boxes
            boxesids = boxesids.concat(boxes);
            boxes.map(box=> {console.log(box); 
                if (box[1]=='s'){
                    let children = this.props.boxes[box]['children']
                   children.map(child=>{
                     boxesids.push('bo-'+child.split("-")[1])
                   });
 
            }});
        });

     
         return boxesids;
       
    }

    componentDidMount(){
        let list = jQuery(this.refs.sortableList);
        let props = this.props;
        list.sortable({ 
           // handle: '.drag-handle' ,
            connectWith: '.connectedSortables',
            stop: (event, ui) => {
                //console.log(this)
                console.log("mueve desde el exterior al exterior");
                const reorderedIndexes = list.sortable('toArray', {attribute: 'data-reactid'}) // Obtiene la nueva disposición de los elementos
                const indexes = reorderedIndexes.map(el => el.split('$').pop()) //Coge solo la parte que indica el orden
                list.sortable('cancel') //Evita que se reordenen para que gestione la llamada Redux
               
                console.log('EXterior')

                const navItems = this.props.navItems;
                const childs = navItems[this.props.navItems[this.props.navItemSelected].parent].children;
 
                var newIndexesAux = [] ;
                var newIndexes = [] ;


                /*Object.keys(indexes).map(i =>{
                    console.log(i);
                     newIndexes.push(childs[i]);
                     console.log("NE",newIndexes);
                    if(navItems[childs[i]].children.length > 0 ){
                        console.log(childs[i], "tiene hijos");
                        console.log(navItems[childs[i]].children);
                        newIndexes = newIndexes.concat(navItems[childs[i]].children);
                    }

                });*/

/*
                childs.forEach(child => {
                    newIndexes.push(child);
                    if(navItems[child].children.length > 0 ){
                        console.log(child, "tiene hijos");
                        console.log(navItems[child].children);
                        newIndexes = newIndexes.concat(navItems[child].children);
                    }
                });
*/
                var child = "";
                indexes.forEach(i => {
                    child = childs[i];
                    newIndexesAux.push(child);
                    if(navItems[child].children.length > 0 ){
                        newIndexesAux = newIndexesAux.concat(navItems[child].children);
                    }
                });

               newIndexesAux.forEach(ind => {
                    newIndexes.push(this.props.navItemsIds.indexOf(ind));
                });

                    console.log('distintos')
                    console.log(indexes)
                    console.log(childs)
                    console.log("********");
                    console.log(newIndexesAux);
                    console.log(newIndexes);
                    //if(indexOf)
                    /*Quiza hay que ver si el eelemnto seleccionado sige estando y si no esta saltar*/
                    this.props.onNavItemReorded(indexes, this.props.navItems[this.props.navItemSelected].parent,0,newIndexesAux) // Cambia el estado pasando como parámetro el id del sortable y el nuevo orden de los elementos. Ahora el orden también se puede UNDO y REDO
        }
        ,
       receive: function(event, ui) {
             list.sortable('cancel')
            console.log("receive CL, Vienen de una sección hasta el exterior")
            console.log(this);
            console.log(this.props.navItemSelected);
            console.log("parent",this.props.navItems[this.props.navItemSelected].parent);
            const reorderedIndexes = list.sortable('toArray', {attribute: 'data-reactid'}) 
            console.log(parent)
            //console.log("PAdre",this.props.navItems[this.props.navItemSelected].parent);
            console.log(reorderedIndexes)
            console.log("AAAAAAAAAAAAAAAAAAAAAAAA");
        }.bind(this)
    }).bind(this);


}
}
