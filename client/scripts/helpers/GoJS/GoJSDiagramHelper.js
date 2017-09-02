var diagramMaker = go.GraphObject.make;

function makeDiagramWithElementID(elementID) {
    return diagramMaker ( go.Diagram, elementID,
                            {
                                initialContentAlignment: go.Spot.Center,
                                "undoManager.isEnabled": true 
                            });
}

// function diagramNodeTemplate () {
// 	return diagramMaker (
// 	go.Node, "Horizontal",
//         { 
//         	background: "#44CCFF" 
//         },
//         diagramMaker(go.TextBlock, "Default Text", 
//             { 
//              	margin: 12, stroke: "white", font: "bold 16px sans-serif" 
//         },
//         new go.Binding("text", "key")),
//         {
//             click: function (e, obj) {
//                 selectedNode = obj.part.data;
//                 formWillAppearWithVariableData(obj.part.data);
//                 showPopup();
//             }
//         }
// 	);
// }

        // workspaceDiagram.nodeTemplate =
        //     $(go.Node, "Horizontal",
        //         { background: "#44CCFF" },
        //         $(go.TextBlock, "Default Text",
        //             { margin: 12, stroke: "white", font: "bold 16px sans-serif" },
        //             new go.Binding("text", "key")),
        //         {
        //             click: function (e, obj) {
        //                 selectedNode = obj.part.data;
        //                 formWillAppearWithVariableData(obj.part.data);
        //                 showPopup();
        //             }


        //         }
        //     );

//         workspaceDiagram.nodeTemplate.contextMenu =
//             $(go.Adornment, "Vertical",
//                 $("ContextMenuButton",
//                     $(go.TextBlock, "Show RuleBase"),
//                     {
//                         click: function (e, obj) {
//                             if (rules.isExist(obj.part.data.key)) {
//                                 selectedNode = obj.part.data;
//                                 popupRulesWithNodeData(obj.part.data);
//                                 showPopupDss();
//                             }
//                         }
//                     }
//                 ),
//                 $("ContextMenuButton",
//                 $(go.TextBlock, "Remove Variable"),
//                     {
//                         click: function (e, obj) {
//                             alert("remove variable");
//                         }
//                     }
//                 )
//             );

//         workspaceDiagram.linkTemplate =
//             $(go.Link,
//                 { routing: go.Link.AvoidsNodes }, 
//                 $(go.Shape),
//                 $(go.Shape, { toArrow: "Standard" })
//             );

//         workspaceDiagram.model = new go.GraphLinksModel(dataWorkspaceNodes, dataWorkspaceLinks);