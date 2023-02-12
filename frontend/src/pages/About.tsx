import { Image, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const About = (): JSX.Element => (
  <VStack spacing="12" pt="10">
    <Text fontSize="4xl" color="orange.400" fontWeight="bold">
      Why KatsApp ?
    </Text>

    <Link to='/'>
      <Image w="56" src="assets/logo.png" alt="Logo-Katsapp" />
    </Link>

    <Text fontSize="xl" color="green.600" fontWeight="bold" style={{textAlign: "justify"}} width="2000px">
    KATSAP est né dans le contexte d'un projet concluant une semaine intensive de piscine organisée par Poc, centre d'innovation étudiant basé à EPITECH, sur le sujet du Software.
    A travers 5 jours complets, les notions de Docker, Database, API Rest, Ui ont été abordées, ainsi que l'apprentissage d'un langage choisi parmi GO ou Typescript.
    </Text>
    <Text fontSize="xl" color="green.600" fontWeight="bold" style={{textAlign: "justify"}} width="2000px">
    Les deux derniers jours ont été, quant à eux, consacrés à la création d'un projet ayant pour objectif de mettre en pratique toutes ces nouvelles notions vues.
    Concernant Katsapp plus précisément, il s'agit d'une application web de messagerie instantanée qui permet à l'utilisateur de communiquer avec une personne, ou en groupe dans des rooms que l'utilisateur peut créer. Il est également possible d'ajouter des amis, d'en rechercher ou de les supprimer de sa liste.
    </Text>

    <Text fontSize="md" color="orange.400" fontWeight="bold">
      Made with ♥️ by Mounia, Martin and Jules
    </Text>
  </VStack>
);

export default About;
