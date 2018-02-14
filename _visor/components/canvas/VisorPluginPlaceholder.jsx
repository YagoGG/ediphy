import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VisorBox from './VisorBox';
import { isAncestorOrSibling, isSortableContainer } from '../../../common/utils';
import { ID_PREFIX_SORTABLE_CONTAINER } from '../../../common/constants';

export default class VisorPluginPlaceholder extends Component {
    idConvert(id) {
        if (isSortableContainer(id)) {
            return id;
        }
        return ID_PREFIX_SORTABLE_CONTAINER + id;

    }
    render() {
        let idContainer = this.idConvert(this.props.pluginContainer);
        let container = this.props.parentBox.sortableContainers[idContainer];
        let className = "drg" + this.props.idContainer;
        if(this.props.boxLevelSelected - this.props.parentBox.level === 1 &&
           isAncestorOrSibling(this.props.parentBox.id, this.props.boxSelected, this.props.boxes)) {
            className += " childBoxSelected";
        }
        return (
            <div style={
                Object.assign({}, {
                    width: "100%",
                    height: container.height === 'auto' ? container.height : container.height + 'px',
                    minHeight: '35px',
                    textAlign: 'center',
                    lineHeight: '100%',
                    boxSizing: 'border-box',
                    position: 'relative',
                    display: 'table',
                }, container.style)
            }
            id={idContainer}
            className={className}>
                {container.colDistribution.map((col, i) => {
                    if (container.cols[i]) {
                        return (<div key={i}
                            style={{ width: col + "%", height: '100%', display: "table-cell", verticalAlign: "top" }}>
                            {container.cols[i].map((row, j) => {
                                return (<div key={j}
                                    style={{ width: "100%", height: row + "%", position: 'relative' }}
                                >
                                    {container.children.map((idBox, index) => {
                                        if (this.props.boxes[idBox].col === i && this.props.boxes[idBox].row === j) {
                                            return (<VisorBox id={idBox}
                                                key={index}
                                                boxes={this.props.boxes}
                                                changeCurrentView={this.props.changeCurrentView}
                                                currentViewSelected={this.props.currentViewSelected}
                                                toolbars={this.props.toolbars}
                                                fromScorm={this.props.fromScorm}
                                                richElementsState={this.props.richElementsState}/>);

                                        } else if (index === container.children.length - 1) {
                                            return (<span><br/><br/></span>);
                                        }
                                        return null;
                                    })}
                                    {container.children.length === 0 ? (<span><br/><br/></span>) : ""}
                                </div>);
                            })}
                        </div>);
                    }
                    return null;
                })}
            </div>
        );
    }

}

VisorPluginPlaceholder.propTypes = {
    /**
   * Nombre del contenedor de plugins
   */
    pluginContainer: PropTypes.string.isRequired,

    /**
   * Identificador único de la caja padre
   */
    parentBox: PropTypes.any,
    /**
   * Diccionario que contiene todas las cajas creadas, accesibles por su *id*
   */
    boxes: PropTypes.object.isRequired,
    /**
   * Caja seleccionada
   */
    boxSelected: PropTypes.any,
    /**
      * Nivel de caja seleccionado
     */
    boxLevelSelected: PropTypes.any,
    /**
     * Cambia la vista actual
     */
    changeCurrentView: PropTypes.func.isRequired,
    /**
     * Diccionario que contiene todas las toolbars
     */
    toolbars: PropTypes.object.isRequired,
    /**
     * Estado del plugin enriquecido en la transición
     */
    richElementsState: PropTypes.object,
    /**
   * Id del contenedor
   */
    idContainer: PropTypes.string.isRequired,
    /**
   * Vista contenida seleccionada
   */
    currentViewSelected: PropTypes.string.isRequired,
};
