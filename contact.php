<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Récupération des données du formulaire avec sécurité de base
    $prenom = htmlspecialchars(trim($_POST["prenom"]));
    $nom = htmlspecialchars(trim($_POST["nom"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $telephone = htmlspecialchars(trim($_POST["telephone"]));
    $sujet = htmlspecialchars(trim($_POST["sujet"]));
    $convives = htmlspecialchars(trim($_POST["convives"]));
    $date = htmlspecialchars(trim($_POST["date"]));
    $heure = htmlspecialchars(trim($_POST["heure"]));
    $message = htmlspecialchars(trim($_POST["message"]));
    
    // Vérification des champs obligatoires
    if (empty($prenom) || empty($nom) || empty($email) || empty($sujet) || empty($message)) {
        echo "Erreur : Veuillez remplir tous les champs obligatoires.";
        exit;
    }
    
    // Destinataire (E-mail de l'agence + e-mail officiel du restaurant)
    $to = "neodastes@gmail.com, info@laskola.be";
    
    // Sujet de l'e-mail
    $subject_email = "Nouvelle demande (" . $sujet . ") - " . $prenom . " " . $nom;
    
    // Contenu de l'e-mail (Format HTML pour faire propre)
    $email_content = "
    <html>
    <head>
      <title>Nouvelle demande - La Skola</title>
      <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #fff; border: 1px solid #d4af37; border-radius: 5px; }
        h2 { color: #d4af37; text-align: center; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { padding: 12px; border-bottom: 1px solid #eee; text-align: left; }
        th { width: 35%; color: #222; font-weight: bold; }
        .message-box { background: #fafafa; padding: 15px; border: 1px solid #eee; border-left: 4px solid #d4af37; margin-top: 20px; font-style: italic; }
        .footer { text-align: center; margin-top: 30px; font-size: 0.9em; color: #777; }
      </style>
    </head>
    <body>
      <div class='container'>
        <h2>🍽️ Nouvelle demande - Brasserie La Skola 🍷</h2>
        <p>Vous avez reçu une nouvelle demande via le formulaire du site web.</p>
        
        <table>
          <tr><th>Sujet :</th><td><strong>{$sujet}</strong></td></tr>
          <tr><th>Nom :</th><td>{$prenom} {$nom}</td></tr>
          <tr><th>E-mail :</th><td><a href='mailto:{$email}'>{$email}</a></td></tr>
          <tr><th>Téléphone :</th><td>{$telephone}</td></tr>
          <tr><th>Date & Heure :</th><td>{$date} à {$heure}</td></tr>
          <tr><th>Convives :</th><td>{$convives}</td></tr>
        </table>
        
        <p><strong>Message :</strong></p>
        <div class='message-box'>
          " . nl2br($message) . "
        </div>
        
        <div class='footer'>
          <p>Ce message a été envoyé depuis le site web de la Brasserie La Skola.</p>
        </div>
      </div>
    </body>
    </html>
    ";
    
    // En-têtes de l'e-mail
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    
    // L'adresse de l'expéditeur (le site web). Doit correspondre au domaine de l'hébergement pour éviter le spam.
    $headers .= "From: Brasserie La Skola <no-reply@laskola.be>" . "\r\n";
    // Si on clique sur 'Répondre', ça répondra directement au client
    $headers .= "Reply-To: {$email}" . "\r\n";
    
    // Envoi de l'e-mail (le 5e paramètre -f force l'expéditeur de l'enveloppe sur les serveurs OVH)
    if (mail($to, $subject_email, $email_content, $headers, "-f no-reply@laskola.be")) {
        // Redirection vers la page de remerciement si l'envoi a réussi
        header("Location: merci.html");
        exit;
    } else {
        echo "Désolé, une erreur est survenue lors de l'envoi de votre message. Veuillez réessayer plus tard.";
    }
} else {
    // Si on essaie d'accéder à la page directement sans soumettre le formulaire
    header("Location: index.html");
    exit;
}
?>
