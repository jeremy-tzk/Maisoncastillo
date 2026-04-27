<?php
// Destinataire
$to = "contact@maisoncastillo.fr";

// Sujet
$subject = "Nouvelle demande de devis Maison Castillo";

// Récupération des champs
$nom       = isset($_POST["nom"])       ? trim($_POST["nom"])       : "";
$prenom    = isset($_POST["prenom"])    ? trim($_POST["prenom"])    : "";
$email     = isset($_POST["email"])     ? trim($_POST["email"])     : "";
$tel       = isset($_POST["tel"])       ? trim($_POST["tel"])       : "";
$service   = isset($_POST["service"])   ? trim($_POST["service"])   : "";
$depart    = isset($_POST["depart"])    ? trim($_POST["depart"])    : "";
$arrivee   = isset($_POST["arrivee"])   ? trim($_POST["arrivee"])   : "";
$date      = isset($_POST["date"])      ? trim($_POST["date"])      : "";
$message   = isset($_POST["message"])   ? trim($_POST["message"])   : "";

// Validation simple
if (empty($nom) || empty($prenom) || empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["error" => "Veuillez remplir tous les champs obligatoires (nom, prénom, email)."]);
    exit;
}

// Corps du mail
$body  = "Nouvelle demande de devis Maison Castillo\n";
$body .= "==========================================\n\n";
$body .= "Prénom : $prenom\n";
$body .= "Nom : $nom\n";
$body .= "Email : $email\n";
$body .= "Téléphone : $tel\n";
$body .= "Service souhaité : $service\n";
$body .= "Départ : $depart\n";
$body .= "Arrivée : $arrivee\n";
$body .= "Date souhaitée : $date\n\n";
$body .= "Message :\n$message\n\n";
$body .= "Envoyé depuis le site web Maison Castillo\n";

// Entêtes
$headers  = "From: noreply@maisoncastillo.fr\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Envoi
if (mail($to, $subject, $body, $headers)) {
    echo json_encode(["success" => true]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Échec de l'envoi de l'email. Merci de réessayer."]);
}
