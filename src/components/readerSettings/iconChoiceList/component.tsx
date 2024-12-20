import React from "react";
import "./iconChoiceList.css";
import { Trans } from "react-i18next";
import { IconChoiceListProps, IconChoiceListState, IconChoiseStyle } from "./interface";
import StorageUtil from "../../../utils/serviceUtils/storageUtil";
import iconArial from '../../../assets/icons/arial.png';
import iconVerdana from '../../../assets/icons/verdana.png';
import iconLeftAlign from '../../../assets/icons/aligne_gauche.png';
import iconRightAlign from '../../../assets/icons/aligne_droite.png';
import iconAddInterval from '../../../assets/icons/interligne_augmenter.png';
import iconReduceInterval from '../../../assets/icons/interligne_reduire.png';
import iconAddFontSize from '../../../assets/icons/agrandir_police.png';
import iconReduceFontSize from '../../../assets/icons/reduire_police.png';
import iconAdd from '../../../assets/icons/augmenter.png';
import iconReduce from '../../../assets/icons/reduire.png';

class IconChoiceList extends React.Component<IconChoiceListProps, IconChoiceListState> {
  iconChoiceList = [
    {
      id: 1,
      title: "Font size",
      value: "fontSize",
      icons: [
        {
          value: "Add",
          src: iconAddFontSize,
          alt: "Augmenter la police"
        },
        {
          value: "Reduce",
          src: iconReduceFontSize,
          alt: "Réduire la police"
        }
      ]
    },
    {
      id: 2,
      title: "Word spacing",
      value: "wordSpacing",
      icons: [
        {
          value: "Add",
          src: iconAdd,
          alt: "Augmenter la police"
        },
        {
          value: "Reduce",
          src: iconReduce,
          alt: "Réduire la police"
        }
      ]
    },
    {
      id: 3,
      title: "Font family",
      value: "fontFamily",
      icons: [
        {
          value: "Arial",
          src: iconArial,
          alt: "Police Arial"
        },
        {
          value: "Verdana",
          src: iconVerdana,
          alt: "Police Verdana"
        }
      ]
    },
    {
      id: 4,
      title: "Line height",
      value: "lineHeight",
      icons: [
        {
          value: "Add",
          src: iconAddInterval,
          alt: "Augmenter l'interligne de 0.5"
        },
        {
          value: "Reduce",
          src: iconReduceInterval,
          alt: "Réduire l'interligne de 0.5"
        }
      ]
    },
    {
      id: 5,
      title: "Text alignment",
      value: "textAlign",
      icons: [
        {
          value: "Left",
          src: iconLeftAlign,
          alt: "Aligner à gauche"
        },
        {
          value: "Right",
          src: iconRightAlign,
          alt: "Aligner à droite"
        }
      ]
    }
  ]
  constructor(props: IconChoiceListProps) {
    super(props);

    const selectedFont = this.iconChoiceList[2].icons.find((item: any) => {
      return (
        item.value ===
        (StorageUtil.getReaderConfig("fontFamily") || "")

      );
    })


    const selectTaillePolice = StorageUtil.getReaderConfig("fontSize")
    this.state = {
      currentFontFamily: selectedFont ? selectedFont.value : "",

      cuurentTaillePolice: selectTaillePolice ? StorageUtil.getReaderConfig("fontSize") : 10,


    }
    this.handleView = this.handleView.bind(this);
  }

  componentDidMount() {
    this.loadGoogleFonts([{
      value: "Arial",
      src: iconArial,
      alt: "Police Arial"
    },
    {
      value: "Verdana",
      src: iconVerdana,
      alt: "Police Verdana"
    }]);
  }

  loadGoogleFonts(fonts: IconChoiseStyle[]) {
    const googleFontLink = document.createElement("link");
    googleFontLink.rel = "stylesheet";
    googleFontLink.href = `https://fonts.googleapis.com/css2?family=${fonts
      .map((font) => font.value.replace(" ", "+"))
      .join("&family=")}&display=swap`;
    document.head.appendChild(googleFontLink);
    const selectedFont = this.iconChoiceList[2].icons.find((item) => {
      return item.value === (StorageUtil.getReaderConfig("fontFamily") || "");
    });

    this.setState({
      currentFontFamily: selectedFont ? selectedFont.value : ""
    });

  }

  handleView(event: any, option: string, value: string) {

    switch (option) {
      case "fontSize":
        let currentFontSize = StorageUtil.getReaderConfig(option)
        console.log("currentFontSize", currentFontSize)
        let newFontSize = currentFontSize
        if ((value === "Add" && currentFontSize < 40) || (value === "Reduce" && currentFontSize > 10)) {
          currentFontSize = value === "Add" ? newFontSize + 5 : newFontSize - 5
          console.log("newFontSize", newFontSize)
          StorageUtil.setReaderConfig(option, "" + currentFontSize);
          this.setState({
            cuurentTaillePolice: newFontSize
          }, () => console.log("Updated state cuurentTaillePolice:", this.state.cuurentTaillePolice))
        }

        console.log(`${option} : ${newFontSize >= 10 && newFontSize <= 40 ? "On change la taille et " : "On ne change pas la taille "} Nouvelle taille : ${newFontSize} et Ancienne taille : ${currentFontSize}`)
        break;
      case "wordSpacing":
        let currentWordSpacing = StorageUtil.getReaderConfig(option)
        let newWordSpacing = currentWordSpacing
        if ((value === "Add" && currentWordSpacing < 20) || (value === "Reduce" && currentWordSpacing > 0)) {
          newWordSpacing = value === "Add" ? newWordSpacing + 5 : newWordSpacing - 5
          StorageUtil.setReaderConfig(option, newWordSpacing);
        }
        console.log(`${option} : ${newWordSpacing >= 0 && newWordSpacing <= 20 ? "On change la taille et " : "On ne change pas la taille "} Nouvelle taille : ${newWordSpacing} et Ancienne taille : ${currentWordSpacing}`)
        break;
      case "fontFamily":
        StorageUtil.setReaderConfig(option, value);
        const selectedFont = this.iconChoiceList[2].icons.find((item) => {
          return item.value === value;
        });

        this.setState({
          currentFontFamily: value
        }, () => console.log("Updated state:", this.state.currentFontFamily));

        document.body.style.setProperty("font-family", selectedFont?.value || "", "important");

        // console.log(`La police appliquée est : ${value}`)
        break;
      case "lineHeight":
        let currentLineHeight = StorageUtil.getReaderConfig(option)
        let newLineHeight = currentLineHeight
        if ((value === "Add" && currentLineHeight < 3) || (value === "Reduce" && currentLineHeight > 1)) {
          newLineHeight = value === "Add" ? newLineHeight += 0.5 : newLineHeight -= 0.5
          StorageUtil.setReaderConfig(option, newLineHeight);
        }
        console.log(`${option} : ${newLineHeight >= 0 && newLineHeight <= 20 ? "On change la taille et " : "On ne change pas la taille "} Nouvelle taille : ${newLineHeight} et Ancienne taille : ${currentLineHeight}`)
        break;
      case "textAlign":
        StorageUtil.setReaderConfig(option, value);
        console.log(`L'alignement appliqué est : ${value}`)
        break;
      default:
        break;
    }

    StorageUtil.setReaderConfig("changeColorsTriggered", "false");
    const changeColorsTriggered = StorageUtil.getReaderConfig("changeColorsTriggered") === "true";
    if (changeColorsTriggered === false) {
      console.log("Calling renderBookFunc");
      this.props.renderBookFunc();
    } else {
      console.warn("renderBookFunc is not defined in props");
    }

  }

  render() {
    const renderParagraphCharacter = () => {
      return this.iconChoiceList.map((item) => (
        <li className="paragraph-character-container" key={item.id}>
          <p className="general-setting-title">
            <Trans>{item.title}</Trans>
          </p>
          {item.icons.map((imgProps, index) => (
            <img
              key={index}
              src={imgProps.src}
              alt={imgProps.alt}
              onClick={(event) => this.handleView(event, item.value, imgProps.value)

              }
              className="cursor-pointer icons-option"
            />
          ))}
        </li>
      ));
    };

    return (
      <ul className="paragraph-character-setting">
        {renderParagraphCharacter()}
      </ul>
    );
  }
}

export default IconChoiceList;
