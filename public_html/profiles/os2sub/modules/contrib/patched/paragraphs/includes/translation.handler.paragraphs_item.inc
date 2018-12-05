<?php

/**
 * @file
 * Paragraphs item translation handler for the entity translation module.
 */


/**
 * Paragraphs item translation handler.
 *b
 * Overrides default behaviours for Paragraphs item properties.
 */
class EntityTranslationParagraphsItemHandler extends EntityTranslationDefaultHandler {

  public $hostEntity = NULL;

  public $hostEntityHandler = NULL;

  /**
   * @inheritdoc
   */
  public function __construct($entity_type, $entity_info, $entity) {
    if (method_exists($entity, 'hostEntity')) {
      $this->hostEntity = $entity->hostEntity();
      $host_entity_type = $entity->hostEntityType();
      if (empty($host_entity_type)) {
        $host_entity_type = 'paragraphs_item';
      }

      // A nested paragraphs field.
      if ($host_entity_type === 'paragraphs_item') {
        // Look for the parent host entity.
        while (method_exists($this->hostEntity, 'hostEntity')) {
          $this->hostEntity->hostEntity();
          $host_entity_type = $this->hostEntity->hostEntityType();
          $this->hostEntity = $this->hostEntity->hostEntity();
        }
      }

      $this->hostEntityHandler =
        entity_translation_get_handler($host_entity_type, $this->hostEntity);
    }

    parent::__construct('paragraphs_item', $entity_info, $entity);

    if (!$this->hostEntity && isset($this->hostEntityHandler->hostEntity)) {
      $this->hostEntity = $this->hostEntityHandler->hostEntity;
    }

    $activeLanguage = (isset($this->hostEntity->language)) ? $this->hostEntity->language : LANGUAGE_NONE;
    $this->setActiveLanguage($activeLanguage);
    $paragraph = $this->getEntity();
    $translations = $this->getParagraphTranslations();
    // Avoid content deletion when user change language on untranslated node.
    if ($translations && count($translations->data) == 1 &&
      isset($this->hostEntity->original) &&
      $this->hostEntity->original->language !== $activeLanguage) {
      $paragraph->revision = TRUE;
    }

    // Handle change to language neutral.
    // Copy content to language neutral fields.
    if ($activeLanguage === LANGUAGE_NONE &&
      !empty($paragraph->translations->data) &&
      $paragraph->translations->original !== LANGUAGE_NONE) {
      $paragraph->revision = TRUE;
      // Use translation in original language as a translation language.
      $originalLanguage = $translations->original;
      $originalTranslation = $translations->data[$originalLanguage];
      // Prepare language neutral translation data.
      // Even untranslated content has translation data as a source translation.
      $originalTranslation['language'] = $activeLanguage;
      unset(
        $originalTranslation['entity_id'],
        $originalTranslation['revision_id']
      );

      $values = array();
      // Get values for source translation.
      foreach (field_info_instances($this->entityType, $this->bundle) as $instance) {
        $field_name = $instance['field_name'];
        $field = field_info_field($field_name);
        if ($field['translatable'] && isset($paragraph->{$field_name}[$originalLanguage])) {
          $values[$field_name][LANGUAGE_NONE] = $paragraph->{$field_name}[$originalLanguage];
        }
      }

      $this->setTranslation($originalTranslation, $values);
      $this->setOriginalLanguage($activeLanguage);

      // We don't need it now.
      $this->removeTranslation($originalLanguage);
      // @TODO Consider removing other languages translations.
      $translations->original = LANGUAGE_NONE;
    }
  }

  /**
   * Get host entity language.
   *
   * @inheritdoc
   */
  public function getLanguage() {
    return $this->hostEntityHandler ?
      $this->hostEntityHandler->getLanguage() :
      parent::getLanguage();
  }

  /**
   * Get form language.
   *
   * @inheritdoc
   *
   * @return bool|string
   *   A langcode.
   */
  public function getFormLanguage() {
    return $this->hostEntityHandler ?
      $this->hostEntityHandler->getFormLanguage() :
      parent::getFormLanguage();
  }

  /**
   * Get host entity source (original) language.
   *
   * @return string
   *   A host entity source langcode.
   */
  public function getSourceLanguage() {
    return $this->hostEntityHandler ?
      $this->hostEntityHandler->getSourceLanguage() :
      parent::getSourceLanguage();
  }

  /**
   * Get host entity available translations.
   *
   * @return object
   *    An array of translations data converted to object.
   */
  public function getTranslations() {
    return $this->hostEntityHandler ?
      $this->hostEntityHandler->getTranslations() :
      parent::getTranslations();
  }

  /**
   * Get paragraph entity available translations.
   *
   * @return array
   *    An array containing translations data.
   */
  public function getParagraphTranslations() {
    return $this->getEntity()->translations;
  }

  /**
   * @see EntityTranslationDefaultHandler::entityFormLanguageWidgetSubmit()
   * @inheritdoc
   */
  public function entityFormLanguageWidgetSubmit($form, &$form_state) {
    $this->updateFormLanguage($form_state);
  }
}
